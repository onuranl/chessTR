const updateLastActive = require('../../../utilities/updateLastActive')

module.exports = (socket, io, store) => {
  socket.on('disconnect', async () => {
    console.log('user ' + socket.id + ' disconnected')

    store.removeConnectedUser(socket.id)

    io.emit('connectedUsers', store.getConnectedUsers())

    const chartID = store.getChartID()

    if (chartID) {
      store.removeOnlineUser(socket.id)
      io.sockets.in(chartID).emit('onlineUsers', store.getOnlineUsers())

      store.removeChartID()
    }

    await updateLastActive(store.getConnectedUser())
  })
}
