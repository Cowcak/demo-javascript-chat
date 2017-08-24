import rapid from 'rapid-io'
import { randanimalSync } from 'randanimal'

let client

export const initClient = () => {
  try {
    const API_KEY = localStorage.getItem('apiKey') // 'MTQwdDAxZTFqNmNjY2g3OS5hcHAtcmFwaWQuaW8='
    client = rapid.createClient(API_KEY)
  } catch (error) {
    console.log(error)
  }
}

export const loadChannels = () => client.collection("channels")

export const loadMessages = () => client.collection("messages")

export const name = randanimalSync()
