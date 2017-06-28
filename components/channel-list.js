import React from 'react'

import Channel from './channel'

const ChannelList = ({ channels, activeChannel, onClick }) =>
  <div>
    <h2>Channels</h2>
    <ul>
      {channels.map(channel =>
        <Channel
          key={channel.id}
          onClick={() => onClick(channel.id)}
          name={channel.id}
          lastMessage={channel.body.lastMessage}
          active={channel.id === activeChannel}
        />
      )}
    </ul>
    <style jsx>
      {`
        h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 32px 0 20px;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}
    </style>
  </div>

export default ChannelList
