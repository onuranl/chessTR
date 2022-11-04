const chart_service = require('../../../services/chart-service')

module.exports = (socket, io, store) => {
  socket.on('message', async (msg) => {
    msg.authorID = store.getConnectedUserID()

    const chartID = store.getChartID()

    await chart_service.updateChatMessages(chartID, msg)

    const newData = await chart_service.getByID(chartID)

    io.sockets.in(chartID).emit('chat', newData)
  })
}
