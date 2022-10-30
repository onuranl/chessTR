module.exports = (socket, io, store) => {
  socket.on('quit', () => {
    console.log('user ' + store.getConnectedUser() + ' quit from game')

    store.removeOnlineUser(socket.id)
    io.sockets
      .in(store.getChartID())
      .emit('onlineUsers', store.getOnlineUsers())

    store.removeChartID()
  })
}
