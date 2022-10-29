const connectedUsers = []
const onlineUsers = {}

const chart_model = require('../../models/chart')

const pools = require('../../helpers/pools')

const updateLastActive = require('../../utilities/updateLastActive')

module.exports = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    var connectedUser = null

    var chartID = null
    var user = null

    socket.on('connection', (stateUser) => {
      console.log('a user ' + socket.id + ' connected')

      const user = {
        socketID: socket.id,
        userID: stateUser._id,
        username: stateUser.username,
      }

      connectedUsers.push(user)
      io.emit('connectedUsers', connectedUsers)

      connectedUser = stateUser
    })

    socket.on('joinAttempt', async (id) => {
      chartID = id

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

    socket.on('join', async (userInfo) => {
      user = userInfo.user
      chartID = userInfo.chartID

      console.log('user ' + user + ' joined the game')

      onlineUsers[socket.id] = user
      io.sockets.in(chartID).emit('onlineUsers', onlineUsers)

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

    socket.on('quit', () => {
      console.log('user ' + onlineUsers[socket.id] + ' quit from game')

      delete onlineUsers[socket.id]
      io.sockets.in(chartID).emit('onlineUsers', onlineUsers)

      chartID = null
    })

    socket.on('disconnect', async () => {
      console.log('user ' + socket.id + ' disconnected')

      const index = connectedUsers.map((e) => e.socketID).indexOf(socket.id)

      if (index > -1) {
        connectedUsers.splice(index, 1)
      }

      io.emit('connectedUsers', connectedUsers)

      if (chartID) {
        console.log('user ' + onlineUsers[socket.id] + ' quit from game')

        delete onlineUsers[socket.id]
        io.sockets.in(chartID).emit('onlineUsers', onlineUsers)

        chartID = null
      }

      await updateLastActive(connectedUser)
    })

    socket.on('moveOn', async (msg) => {
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

    socket.on('time', async (data) => {
      io.sockets.in(chartID).emit('timeBroadcast', data)
    })

    socket.on('getTime', async (user) => {
      io.sockets.in(chartID).emit('setTime', user)
    })

    socket.on('message', async (msg) => {
      msg.authorID = user

      await chart_model.findOneAndUpdate(
        { _id: chartID },
        { $push: { chat: msg } }
      )

      const newData = await chart_model
        .findById(chartID)
        .populate('users.user', 'email')

      io.sockets.in(chartID).emit('chat', newData)
    })

    socket.on('match', (data) => {
      pools.map(async (pool, index) => {
        const isUserInPool = pool.searchers.indexOf(socket.id)

        if (isUserInPool !== -1) {
          pool.searchers.splice(isUserInPool, 1)
        }

        if (data) {
          if (pool.clock === data.clock && pool.perf === data.perf) {
            pool.searchers.push(socket.id)

            const searchers = pools[index].searchers

            if (searchers[searchers.length - 2]) {
              const payload = {}
              const createdChart = await chart_model.create(payload)

              io.to(searchers[searchers.length - 2]).emit(
                'generate',
                createdChart
              )

              var userController

              userController = setInterval(async function () {
                const chart = await chart_model.findById(createdChart._id)
                if (chart.users.length > 0) {
                  io.to(searchers[searchers.length - 1]).emit(
                    'generate',
                    createdChart
                  )

                  clearInterval(userController)
                }
              }, 1000)
            }
          }
        }
      })
    })

    socket.on('private message', async (data) => {
      io.to(data.socketID).emit('private message', data)
    })

    socket.on('friendship', async (data) => {
      io.to(data.socketID).emit('friendship', {
        status: data.status,
        user: data.user,
      })
    })
  })

  return io
}
