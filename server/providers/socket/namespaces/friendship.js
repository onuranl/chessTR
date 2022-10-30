module.exports = (socket, io) => {
  socket.on('friendship', async (data) => {
    io.to(data.socketID).emit('friendship', {
      status: data.status,
      user: data.user,
    })
  })
}
