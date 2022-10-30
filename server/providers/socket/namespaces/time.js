module.exports = (socket, io, store) => {
  socket.on('get time', (user) => {
    io.sockets.in(store.getChartID()).emit('setTime', user)
  })
}
