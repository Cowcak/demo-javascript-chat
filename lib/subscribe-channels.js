import { channels } from './rapid'

export default (onvalue, onerror) => {
  return channels.subscribe(onvalue, onerror)
}
