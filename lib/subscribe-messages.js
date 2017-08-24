import { loadMessages } from './rapid'

export default (channel, onvalue, onerror) => {
  const messages = loadMessages()

  return messages.filter({ channelId: channel }).subscribe(onvalue, onerror)
}
