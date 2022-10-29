require('dotenv').config()

const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const server = require('http').createServer(app)

const router = require('./routes/index')

// Providers
require('./providers/database')
require('./providers/socket')(server)

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())

app.use('/', router)

server.listen(8000, '0.0.0.0')
