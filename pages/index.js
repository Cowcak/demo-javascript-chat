import React, { Component } from 'react'

import Page from '../components/page'
import Header from '../components/header'

import Loader from '../components/loader'
import Input from '../components/input'
import ChannelList from '../components/channel-list'
import MessageList from '../components/message-list'
import AddChannel from '../components/add-channel'
import WelcomePage from '../components/welcome'

import { initClient } from '../lib/rapid'
import subscribeChannels from '../lib/subscribe-channels'
import subscribeMessages from '../lib/subscribe-messages'
import sendMessage from '../lib/send-message'
import createChannel from '../lib/create-channel'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      channel: 'general',
      channels: [],
      messages: [],
      text: '',
      signing: true,
      signed: false,
    }
  }

  componentDidMount() {
    const apiKey = localStorage.getItem('apiKey')

    if (apiKey) {
      this.initRapidClient(apiKey)
    }

    this.setState({ signing: false })
  }

  componentWillUnmount() {
    this.channels && this.channels.unsubscribe()
    this.messages && this.messages.unsubscribe()
  }

  async initRapidClient(apiKey) {
    try {
      await initClient(apiKey)
      this.setState({ signed: true })
      this.initSubscriptions()
    } catch (error) {
      console.error(error)
      alert(
        'It seems the API key is invalid. Try to create a new project within your dashboard and use a new API key. If problem still occurs, please reach us at info@rapid.io.'
      )
    }
  }

  initSubscriptions() {
    const { channel } = this.state

    this.channels = subscribeChannels(
      channels => this.setState({ channels }),
      err => console.error('channels subscribe error', err)
    )
    this.messages = subscribeMessages(
      channel,
      messages => this.setState({ messages, loading: false }),
      err => console.error(err)
    )
  }

  handleApiKeySubmit = apiKey => {
    this.initRapidClient(apiKey)
  }

  handleChannelClick = channel => {
    this.setState({ channel })

    if (this.messages) {
      this.messages.unsubscribe()
      this.setState({ loading: true })
    }

    this.messages = subscribeMessages(
      channel,
      messages => this.setState({ messages, loading: false }),
      err => console.error(err)
    )
  }

  handleInputChange = event => {
    this.setState({ text: event.target.value })
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.sendMessage()
    }
  }

  createChannel = (name, cb) => {
    const regex = /^[0-9a-zA-Z_-]+$/

    if (!regex.test(name) || name.length < 3) {
      alert('Invalid channel name')
      return
    }

    createChannel(name, () => {
      cb()
      this.handleChannelClick(name)
    })
  }

  async sendMessage() {
    const { channel, text } = this.state
    if (text === '') {
      return
    }
    try {
      this.setState({ text: '' })
      await sendMessage(channel, text)
    } catch (err) {
      console.log('message not sent', err)
    }
  }

  render() {
    const {
      channels,
      channel,
      messages,
      text,
      loading,
      signing,
      signed,
    } = this.state

    if (signing) {
      return <div />
    }

    if (!signed) {
      return <WelcomePage onSubmit={this.handleApiKeySubmit} />
    }

    return (
      <Page heading={`# ${channel}`}>
        <div>
          <aside>
            <ChannelList
              channels={channels}
              activeChannel={channel}
              onClick={this.handleChannelClick}
            />
            <AddChannel onSubmit={this.createChannel} />
          </aside>
          <main>
            <MessageList messages={messages} loading={loading} />
            <Input
              placeholder="Type a message..."
              onChange={this.handleInputChange}
              onPress={this.handleKeyPress}
              value={text}
            />
          </main>
        </div>
        <style jsx>
          {`
            div {
              display: flex;
              flex: 1;
            }
            aside {
              flex: 1;
              max-width: 400px;
              border-right: 1px solid #EEEBF3;
              padding: 0 0 0 80px;
              overflow: auto;
              position: relative;                  
            }
            @media screen and (min-width: 800px) {
              aside {
                padding: 0 0 0 130px;              
              }
            }
            main {
              flex: 2;
              display flex;
              flex-direction: column;
              overflow: hidden;
            }
          `}
        </style>
      </Page>
    )
  }
}
