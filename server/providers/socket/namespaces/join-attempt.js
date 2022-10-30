const chart_model = require('../../../models/chart')

module.exports = (socket, io, store) => {
  socket.on('join attempt', async (id) => {
    store.setChartID(id)

    const chartID = store.getChartID()

    socket.join(chartID)

    const data = await chart_model.findById(chartID)
    const sockets = await io.of('/').in(chartID).allSockets()

    var socketNumber = 0

    for (client of sockets) {
      socketNumber++
    }

    if (socketNumber === 2 && data.private && data.users.length !== 2) {
      io.sockets.in(chartID).emit('onlineUsers')
    }
  })
}
