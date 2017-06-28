import React, { Component } from 'react'

import Message from './message'

export default class MessageList extends Component {
  componentDidUpdate() {
    if (this.view) {
      this.view.scrollTop = this.view.scrollHeight
    }
  }

  render() {
    const { messages } = this.props
    return (
      <div ref={ref => (this.view = ref)}>
        {messages.map(message => <Message key={message.id} {...message} />)}
        <style jsx>
          {`
            div {
              flex: 1;
              padding: 20px 60px;
              overflow-y: scroll;
            }
          `}
        </style>
      </div>
    )
  }
}
