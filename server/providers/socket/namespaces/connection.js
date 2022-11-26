module.exports = (socket, io, globalStore, store) => {
  socket.on('connection', (stateUser) => {
    console.log('a user ' + socket.id + ' connected')

    const user = {
      socketID: socket.id,
      userID: stateUser._id,
      username: stateUser.username,
    }

    globalStore.addConnectedUser(user)

    io.emit('connectedUsers', globalStore.getConnectedUsers())

    store.setConnectedUser(stateUser)
  })
}
