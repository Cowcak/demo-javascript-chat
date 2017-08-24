import { loadChannels } from './rapid'

const createChannel = (name, onComplete) => {
  const channels = loadChannels()

  const lastMessage = {
    lastMessage: {
      id: '',
      text: '',
    },
  }

  channels.document(name).mutate(lastMessage, onComplete)
}

export default createChannel
