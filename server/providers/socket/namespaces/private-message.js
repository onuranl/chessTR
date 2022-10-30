module.exports = (socket, io) => {
  socket.on('private message', async (data) => {
    io.to(data.socketID).emit('private message', data)
  })
}
