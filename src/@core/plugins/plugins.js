import Socket from 'vue-native-websocket-vue3'

const wsUrl = process.env.NODE_ENV === 'production' ? 'wss://fixed-twisty-dive.glitch.me' : 'ws://localhost:3000'


export function addSocket( app ) {
  app.use(Socket, wsUrl, {
    'reconnection':         true,
    'reconnectionAttempts': 5,
    'reconnectionDelay':    3000,
    format: 'json'
  })
}