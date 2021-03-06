import React, { Component } from 'react'

import Page from '../components/page'
import Header from '../components/header'
import Loader from '../components/loader'

import Input from '../components/input'
import ChannelList from '../components/channel-list'
import MessageList from '../components/message-list'
import AddChannel from '../components/add-channel'

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
      isMenuOpen: false,
    }
  }

  componentDidMount() {
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

  componentWillUnmount() {
    this.channels && this.channels.unsubscribe()
    this.messages && this.messages.unsubscribe()
  }

  handleChannelClick = channel => {
    this.setState({ channel })

    this.state.isMenuOpen && this.toggleMobileMenu()

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

  toggleMobileMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen })

  render() {
    const {
      channels,
      channel,
      messages,
      text,
      loading,
      isMenuOpen,
    } = this.state
    return (
      <Page
        heading={`# ${channel}`}
        onMenuClick={this.toggleMobileMenu}
        isMenuOpen={isMenuOpen}
      >
        <div>
          <aside className={`${isMenuOpen && 'open'}`}>
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
              border-right: 1px solid #EEEBF3;
              padding: 0 0 0 50px;
              overflow: auto;
              -webkit-overflow-scrolling: touch;
              position: absolute;
              top: 0;
              bottom: 0;
              width: 100%;
              background: #fff;
              z-index: 10;
              transform: translate3d(-100%,0,0);
              transition: transform .4s ease;
            }

            aside.open {
              transform: translate3d(0,0,0);
            }

            @media screen and (min-width: 800px) {
              aside {
                position: relative;
                top: auto;
                bottom: auto;
                transform: none;
                flex: 1;
                max-width: 400px;
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
