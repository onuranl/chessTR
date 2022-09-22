const user_model = require('../models/user')
const jwt = require('jsonwebtoken')

async function getUser(id) {
  return await user_model.findOne({ _id: id })
}

async function getUserByUsername(username) {
  return await user_model.findOne({ username: username })
}

async function createUser(user) {
  let result = await user_model.create(user)

  let userto = new user_model()

  jwt.sign(userto.toJSON(), process.env.TOKEN_SECRET, {
    expiresIn: 604800,
  })

  return result
}

async function login(user) {
  let foundUser = await user_model.findOne({ email: user.email })

  return foundUser
}

async function isUsernameTaken(username) {
  let result = await user_model.findOne({ username: username })

  return result !== null
}

async function isEmailExits(email) {
  let result = await user_model.findOne({ email: email })

  return result !== null
}

module.exports = {
  createUser,
  login,
  getUser,
  getUserByUsername,
  isUsernameTaken,
  isEmailExits,
}
