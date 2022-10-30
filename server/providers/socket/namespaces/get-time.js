module.exports = (socket, io, store) => {
  socket.on('time', (data) => {
    io.sockets.in(store.getChartID()).emit('timeBroadcast', data)
  })
}
