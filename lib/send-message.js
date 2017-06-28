import { channels, messages, name } from './rapid'

const sendMessage = async (channel, text) => {
  const message = {
    channelId: channel,
    senderName: name,
    sentDate: Date.now(),
    text
  }

  await messages.newDocument().mutate(message)
  await channels.document(channel).merge({ lastMessage: message })
}

export default sendMessage
