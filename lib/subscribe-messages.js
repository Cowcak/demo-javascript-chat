import { messages } from './rapid'

export default (channel, onvalue, onerror) => {
  return messages.filter({ channelId: channel }).subscribe(onvalue, onerror)
}
