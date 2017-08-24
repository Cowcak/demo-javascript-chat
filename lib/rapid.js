import rapid from 'rapid-io'
import { randanimalSync } from 'randanimal'

let client

export const initClient = apiKey =>
  new Promise((resolve, reject) => {
    try {
      client = rapid.createClient(apiKey)

      localStorage.setItem('apiKey', apiKey)

      resolve(client)
    } catch (error) {
      reject(error)
    }
  })

export const loadChannels = () => client.collection('channels')

export const loadMessages = () => client.collection('messages')

export const name = randanimalSync()
