import rapid from 'rapid-io'
import { randanimalSync } from 'randanimal'

const API_KEY = '' // paste your API key here

const client = rapid.createClient(API_KEY)

export default client
export const channels = client.collection("channels")
export const messages = client.collection("messages")
export const name = randanimalSync()
