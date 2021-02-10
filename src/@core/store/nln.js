import { createStore } from 'vuex'

const state = () => ({
  user:       null,
  chats:      {},
  activeChat: {},
  socket:     {
    isConnected: false,
    client:      null
  }
})

// Create a new store instance.
const store = createStore({
  state,
  mutations: {
    setUser( state, user ) {
      state.user = user
    },
    setSocketState( state ) {
      state.socket.isConnected = true
    },
    loadChats( state, chats ) {
      state.chats = chats
    },
    setChat( state, chat ) {
      state.chats[ chat.id ] = chat
    },
    setActiveChat( state, chat ) {
      console.log(chat)
      state.activeChat = chat
    },
    setProp( state, { prop, value } ) {
      state[ prop ] = value
    }
  },
  actions:   {
    async init( { commit, state }, client ) {
      commit('setProp', {
        prop:  'socket',
        value: {
          isConnected: true,
          client:      client
        }
      })

      state.socket.client.addEventListener('message', ( { data } ) => {
        let { event, payload } = JSON.parse(data)
        console.log('received event', event)
        console.log('received data', payload)
        switch (event) {
          case 'chat.created':
            commit('setProp', {
              prop:  `chats`,
              value: {
                ...state.chats,
                payload
              }
            })
            break
          case 'user.join':
            commit('setProp', {
              prop: 'activeChat',
              value: {
                ...state.activeChat,
                participants: payload
              }
            })
            break
          // case 'user.left':
          //   userLeftChat(io, payload)
          //   break
          case 'connected':
            console.log('connected')
        }
      })

    },
    async createChat( { commit, state }, chat ) {

      commit('setProp', {
        prop:  `chats`,
        value: {
          ...state.chats,
          chat
        }
      })

      state.socket.client.sendObj({
        event:   'chat.created',
        payload: chat
      })

    },

    async joinChat( { state, commit }, chat ) {



      commit('setActiveChat', chat)

      state.socket.client.sendObj({
        event:   'user.join',
        payload: {
          user:   state.user,
          chatId: chat.id
        }
      })

    },

  }
})

export { store }
