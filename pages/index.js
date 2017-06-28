import React, { Component } from 'react'

import Page from '../components/page'
import Header from '../components/header'
import Loader from '../components/loader'

import Input from '../components/input'
import ChannelList from '../components/channel-list'
import MessageList from '../components/message-list'

import subscribeChannels from '../lib/subscribe-channels'
import subscribeMessages from '../lib/subscribe-messages'
import sendMessage from '../lib/send-message'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      channel: 'general',
      channels: [],
      messages: [],
      text: ''
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
      messages => this.setState({ messages }),
      err => console.error(err)
    )
  }

  componentWillUnmount() {
    this.channels && this.channels.unsubscribe()
    this.messages && this.messages.unsubscribe()
  }

  handleChannelClick = channel => {
    if (this.messages) {
      this.messages.unsubscribe()
    }

    this.messages = subscribeMessages(
      channel,
      messages => this.setState({ messages, loading: false, channel }),
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
    const { channels, channel, messages, text, loading } = this.state
    return (
      <Page heading={`# ${channel}`}>
        <div>
          <aside>
            <ChannelList
              channels={channels}
              activeChannel={channel}
              onClick={this.handleChannelClick}
            />
          </aside>
          <main>
            <MessageList messages={messages} />
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

const channels = [
  {
    id: 'general',
    body: {}
  },
  {
    id: 'random',
    body: {}
  },
  {
    id: 'social',
    body: {}
  }
]
