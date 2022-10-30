const chart_model = require('../../../models/chart')

module.exports = (socket, io, store) => {
  socket.on('message', async (msg) => {
    msg.authorID = store.getConnectedUserID()

    const chartID = store.getChartID()

    await chart_model.findOneAndUpdate(
      { _id: chartID },
      { $push: { chat: msg } }
    )

    const newData = await chart_model
      .findById(chartID)
      .populate('users.user', 'email')

    io.sockets.in(chartID).emit('chat', newData)
  })
}
