const chart_model = require('../../../models/chart')

module.exports = (socket, io, store) => {
  socket.on('join', async (userInfo) => {
    const user = store.getConnectedUserID()
    const chartID = store.getChartID()

    console.log('user ' + user + ' joined the game')

    store.addOnlineUser(socket.id, user)

    io.sockets.in(chartID).emit('onlineUsers', store.getOnlineUsers())

    const data = await chart_model.findById(chartID).populate('users.user')

    const isUserExist = data.users.findIndex((item) => item.user.id === user)

    if (isUserExist !== 0) {
      if (data.users.length <= 1) {
        const userColor = userInfo.color
        var color

        if (userColor) {
          color = userColor
        } else {
          data.users.length && data.users[0].color === 'white'
            ? (color = 'black')
            : (color = 'white')
        }

        const payload = {
          user: user,
          item: userInfo.time,
          color: color,
        }

        await chart_model.findOneAndUpdate(
          { _id: chartID },
          { $push: { users: payload } }
        )
      } else {
        await chart_model.findOneAndUpdate(
          { _id: chartID },
          { $push: { audience: user } }
        )
      }
    }

    const newData = await chart_model
      .findById(chartID)
      .populate('users.user', 'email')

    io.sockets.in(chartID).emit('broadcast', newData)
  })
}
