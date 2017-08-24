import { loadChannels, loadMessages, name } from './rapid'

const sendMessage = async (channel, text) => {
  const messages = loadMessages()
  const channels = loadChannels()

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
  await newMessage.mutate(message)

  // mutate channel with info about last message
  // that contains id of document with new message
  // and text of the new message
  await channels
    .document(channel)
    .merge({ 
      lastMessage: {
        id: newMessage.id,
        text,
      }
    })
}

export default sendMessage
