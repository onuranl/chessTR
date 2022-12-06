const chart_service = require('../../../services/chart-service')

module.exports = (socket, io, globalStore, store) => {
  socket.on('join', async (userInfo) => {
    const user = store.getConnectedUserID()
    const chartID = store.getChartID()

    console.log('user ' + user + ' joined the game')

    globalStore.addOnlineUser(socket.id, user)

    io.sockets.in(chartID).emit('onlineUsers', globalStore.getOnlineUsers())

    const data = await chart_service.getByID(chartID)

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
          time: userInfo.time || data.users[0].time,
          increment: userInfo.increment === 0 ? 0 : userInfo.increment || data.users[0].increment,
          color: color,
        }

        await chart_service.updatePlayers(chartID, payload)
      } else {
        await chart_service.updateAudience(chartID, user)
      }
    }

    const newData = await chart_service.getByID(chartID)

    io.sockets.in(chartID).emit('broadcast', newData)
  })
}
