const chart_model = require('../../../models/chart')

module.exports = (socket, io, store) => {
  socket.on('move on', async (msg) => {
    const chartID = store.getChartID()

    const oldData = await chart_model.findById(chartID)

    if (oldData && oldData.chartHistory.history) {
      msg.chartHistory.history = [
        ...oldData.chartHistory.history,
        ...msg.chartHistory.history,
      ]
    }

    await chart_model.findOneAndUpdate({ _id: chartID }, msg)
    const newData = await chart_model.findById(chartID)

    io.sockets.in(chartID).emit('broadcast', newData)
  })
}
