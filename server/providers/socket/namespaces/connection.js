module.exports = (socket, io, store) => {
  socket.on('connection', (stateUser) => {
    console.log('a user ' + socket.id + ' connected')

    const user = {
      socketID: socket.id,
      userID: stateUser._id,
      username: stateUser.username,
    }

    store.addConnectedUser(user)

    io.emit('connectedUsers', store.getConnectedUsers())

    store.setConnectedUser(stateUser)
  })
}
