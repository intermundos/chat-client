
export const state = () => ({
  user:       null,
  chats:      {},
  activeChat: {},
  socket:     {
    isConnected: false,
    client:      null
  }
})