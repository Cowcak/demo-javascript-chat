import { channels } from './rapid'

const createChannel = (name, onComplete) => {
  const lastMessage = {
    lastMessage: {
      id: '',
      text: '',
    },
  }

  channels.document(name).mutate(lastMessage, onComplete)
}

export default createChannel
