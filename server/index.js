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

//FIXED IT
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('connection', async (userInfo) => {
    const data = await chart_model
      .findById(userInfo.chartID)
      .populate('users.user')

    const isUserExist = data.users.findIndex((item) => {
      if (item.user.id === userInfo.user) {
        return true
      } else {
        return false
      }
    })

    if (isUserExist !== 0) {
      if (data.users.length <= 1) {
        const payload = {
          user: userInfo.user,
          color:
            userInfo.color || data.users[0].color === 'white'
              ? 'black'
              : 'white',
        }
        await chart_model.findOneAndUpdate(
          { _id: userInfo.chartID },
          { $push: { users: payload } }
        )
      } else {
        await chart_model.findOneAndUpdate(
          { _id: userInfo.chartID },
          { $push: { audience: userInfo.user } }
        )
      }
    }

    const newData = await chart_model
      .findById(userInfo.chartID)
      .populate('users.user', 'email')

    io.emit('broadcast', newData)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('moveOn', async (msg) => {
    await chart_model.findOneAndUpdate({ _id: msg._id }, msg)
    const newData = await chart_model.findById(msg._id)
    io.emit('broadcast', newData)
  })

  socket.on('message', async (msg) => {
    await chart_model.findOneAndUpdate(
      { _id: msg.chartID },
      { $push: { chat: msg } }
    )

    const newData = await chart_model
      .findById(msg.chartID)
      .populate('users.user', 'email')

    io.emit('chat', newData.chat)
  })
})

app.use('/', router)

server.listen(8000, () => {
  console.log('listening on *:8000')
})
