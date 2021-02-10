export default {

  setUser( state, user ) {
    state.user = user
  },

  setActiveChat( state, chat ) {
    state.activeChat = chat
  },

  setProp( state, { prop, value } ) {
    state[ prop ] = value
  },

  addChat( state, chat ) {
    state.chats = {
      ...state.chats,
      chat
    }
  },
  addMessage( state, message ) {
    if (state.activeChat.id === message.chatId) {
      state.activeChat.messages.push(message)
    }
  }

}

