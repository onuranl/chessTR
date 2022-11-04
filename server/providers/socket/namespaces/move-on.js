const chart_service = require('../../../services/chart-service')

module.exports = (socket, io, store) => {
  socket.on('move on', async (msg) => {
    const chartID = store.getChartID()

    const oldData = await chart_service.getByID(chartID)

    if (oldData && oldData.chartHistory.history) {
      msg.chartHistory.history = [
        ...oldData.chartHistory.history,
        ...msg.chartHistory.history,
      ]
    }

    await chart_service.update(chartID, msg)

    const newData = await chart_service.getByID(chartID)

    io.sockets.in(chartID).emit('broadcast', newData)
  })
}
