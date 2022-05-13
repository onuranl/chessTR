const user_model = require('../models/user')
const jwt = require('jsonwebtoken')

async function getUser(id) {
  return await user_model.findOne({ _id: id })
}

async function createUser(user) {
  let result = await user_model.create(user)

  let userto = new user_model()

  jwt.sign(userto.toJSON(), '123213123LASKDAŞLSKDAD%+%+%', {
    expiresIn: 604800,
  })

  return result
}

async function login(user) {
  let foundUser = await user_model.findOne({ email: user.email })

  return foundUser
}

module.exports = { createUser, login, getUser }
