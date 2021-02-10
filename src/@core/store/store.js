import { createStore } from 'vuex'
import { state }       from './modules/chat/state.js'
import Mutations       from './modules/chat/mutations.js'
import Actions         from './modules/chat/actions.js'

const store = createStore({
  state,
  mutations: Mutations,
  actions:   Actions
})

export { store }
