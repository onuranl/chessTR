module.exports = (socket, io, globalStore, store) => {
  socket.on('quit', () => {
    console.log('user ' + store.getConnectedUserID() + ' quit from game')

    globalStore.removeOnlineUser(socket.id)
    io.sockets
      .in(store.getChartID())
      .emit('onlineUsers', globalStore.getOnlineUsers())

    store.removeChartID()
  })
}
