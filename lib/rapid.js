import rapid from 'rapid-io'
import { randanimalSync } from 'randanimal'

const API_KEY = 'ZGV2LXdzLXNlcnZpY2UucmFwaWQuaW8='

const COLLECTION_NAME = 'rapichat-js'

const AUTH_KEY =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJydWxlcyI6W3siY2hhbm5lbCI6eyJwYXR0ZXJuIjoiLioifSwicmVhZCI6dHJ1ZSwid3JpdGUiOnRydWV9LHsiY29sbGVjdGlvbiI6eyJwYXR0ZXJuIjoiLioifSwicmVhZCI6dHJ1ZSwiY3JlYXRlIjp0cnVlLCJ1cGRhdGUiOnRydWUsImRlbGV0ZSI6dHJ1ZX1dfQ.MdQbdW958yzRQk46qj7_bY92A60pxtSkDgy9yJV7Vd8'

const client = rapid.createClient(API_KEY)

try {
  client.authorize(AUTH_KEY)
} catch (err) {
  console.log(err)
}

export default client
export const channels = client.collection(`channels-${COLLECTION_NAME}`)
export const messages = client.collection(`messages-${COLLECTION_NAME}`)
export const name = randanimalSync()

const lastMessage = channel => ({
  channelId: channel,
  senderName: 'rapid-bot',
  sendDate: Date.now(),
  text: `Hello @ ${channel} from rapid-bot 🤖`
})
