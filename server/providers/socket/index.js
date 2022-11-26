const { GlobalStore, Store } = require('./store')

module.exports = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  })

  const globalStore = new GlobalStore()

  io.on('connection', (socket) => {
    const store = new Store()

    require('./namespaces/connection')(socket, io, globalStore, store)
    require('./namespaces/join-attempt')(socket, io, store)
    require('./namespaces/join')(socket, io, globalStore, store)
    require('./namespaces/quit')(socket, io, globalStore, store)
    require('./namespaces/disconnect')(socket, io, globalStore, store)
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
