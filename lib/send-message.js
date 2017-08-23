import { channels, messages, name } from './rapid'

const sendMessage = (channel, text) => {
  // content of new message
  const message = {
    channelId: channel,
    senderName: name,
    sentDate: Date.now(),
    text
  }

  // reference of new document for the message
  const newMessage = messages.newDocument()

  // mutate content of the new message document
  newMessage.mutate(message)

  // mutate channel with info about last message
  // that contains id of document with new message
  // and text of the new message
  channels
    .document(channel)
    .merge({ 
      lastMessage: {
        id: newMessage.id,
        text,
      }
    })
}

export default sendMessage
