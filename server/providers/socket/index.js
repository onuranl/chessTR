const { Store } = require('./store')

module.exports = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  })

  const store = new Store()

  io.on('connection', (socket) => {
    require('./namespaces/connection')(socket, io, store)
    require('./namespaces/join-attempt')(socket, io, store)
    require('./namespaces/join')(socket, io, store)
    require('./namespaces/quit')(socket, io, store)
    require('./namespaces/disconnect')(socket, io, store)
    require('./namespaces/move-on')(socket, io, store)
    require('./namespaces/time')(socket, io, store)
    require('./namespaces/get-time')(socket, io, store)
    require('./namespaces/message')(socket, io, store)
    require('./namespaces/match')(socket, io)
    require('./namespaces/private-message')(socket, io)
    require('./namespaces/friendship')(socket, io)
  })

  return io
}
