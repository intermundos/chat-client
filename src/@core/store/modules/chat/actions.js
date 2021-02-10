async function init( { commit, state }, client ) {

  commit('setProp', {
    prop:  'socket',
    value: {
      isConnected: true,
      client:      client
    }
  })

  state.socket.client.addEventListener('message', ( { data } ) => {

    let { event, payload } = JSON.parse(data)

    switch (event) {
      case 'user.login':
        commit('setProp', { prop:  `chats`, value: payload })
        break
      case 'chat.created':
        commit('addChat', payload)
        break
      case 'chat.message':
        commit('addMessage', payload)
        break
      case 'connected':
        console.log('connected')
    }
  })

}

async function userLogin({ state }) {
  state.socket.client.sendObj({ event: 'user.login', payload: state.user })
}

async function createChat( { commit, state }, chat ) {

  let chats = state.chats

  chats[chat.id] = { ...chat, participants: [], messages: [] }

  commit('setProp', { prop:  `chats`, value: chats })

  state.socket.client.sendObj({
    event:   'chat.created',
    payload: chat
  })

}

async function joinChat( { state, commit }, chat ) {
  commit('setActiveChat', chat)
}

async function sendMessage({ state, commit }, payload) {

  const message = {
    message: payload,
    participant: state.user,
    chatId: state.activeChat.id,
    ts: new Date()
  }

  commit('addMessage', message)

  state.socket.client.sendObj({
    event:   'chat.message',
    payload: message
  })
}

export default {
  init,
  userLogin,
  createChat,
  joinChat,
  sendMessage
}