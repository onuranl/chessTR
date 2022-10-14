const user_model = require('../models/user')
const jwt = require('jsonwebtoken')

async function getUser(id) {
  return await user_model.findOne({ _id: id }).populate('friends', 'username')
}

async function getAllUsers() {
  return await user_model.find()
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
  return await user_model.findOne({ email: user.email })
}

async function isUsernameTaken(username) {
  let result = await user_model.findOne({ username: username })

  return result !== null
}

async function isEmailExits(email) {
  let result = await user_model.findOne({ email: email })

  return result !== null
}

async function updateFriends(userID, friend) {
  return await user_model.findByIdAndUpdate(userID.toString(), {
    $push: { friends: friend.toString() },
  })
}

module.exports = {
  createUser,
  login,
  getUser,
  getAllUsers,
  getUserByUsername,
  isUsernameTaken,
  isEmailExits,
  updateFriends,
}
