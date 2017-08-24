import { loadChannels } from './rapid'

export default (onvalue, onerror) => {
  const channels = loadChannels()

  return channels.subscribe(onvalue, onerror)
}
