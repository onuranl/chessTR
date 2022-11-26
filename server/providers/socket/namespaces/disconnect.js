const user_service = require('../../../services/user-service')

module.exports = (socket, io, globalStore, store) => {
  socket.on('disconnect', async () => {
    console.log('user ' + socket.id + ' disconnected')

    globalStore.removeConnectedUser(socket.id)

    io.emit('connectedUsers', globalStore.getConnectedUsers())

    const chartID = store.getChartID()

    if (chartID) {
      globalStore.removeOnlineUser(socket.id)
      io.sockets.in(chartID).emit('onlineUsers', globalStore.getOnlineUsers())

      store.removeChartID()
    }

    await user_service.updateLastActive(store.getConnectedUser())
  })
}
