require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const router = require('./routes/index')

const chart_model = require('./models/chart')

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('connected to the database'))
  .catch((e) => console.log(e))

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// const connectedUsers = {}
const onlineUsers = {}

io.on('connection', (socket) => {
  var chartID = null
  var user = null

  // connectedUsers[socket.id] = user
  // io.sockets.in(chartID).emit('connectedUsers', connectedUsers)

  socket.on('connection', async (userInfo) => {
    user = userInfo.user
    chartID = userInfo.chartID

    console.log('a user ' + user + ' connected')

    socket.join(chartID)

    onlineUsers[socket.id] = user
    io.sockets.in(chartID).emit('onlineUsers', onlineUsers)

    const data = await chart_model.findById(chartID).populate('users.user')

    const isUserExist = data.users.findIndex((item) => {
      if (item.user.id === user) {
        return true
      } else {
        return false
      }
    })

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

  socket.on('disconnect', () => {
    console.log('user ' + onlineUsers[socket.id] + ' disconnected')

    delete onlineUsers[socket.id]
    io.sockets.in(chartID).emit('onlineUsers', onlineUsers)
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
})

app.use('/', router)

server.listen(8000, () => {
  console.log('listening on *:8000')
})
