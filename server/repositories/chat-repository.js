const chat_model = require('../models/chat')

async function getByChatID(chatID) {
  return await chat_model.findById(chatID).populate('users', 'username')
}

async function getByUserID(userID) {
  return await chat_model.find({ users: userID }).populate('users', 'username')
}

async function create(users) {
  const chat = await chat_model.create(users)

  return await getByChatID(chat._id)
}

async function sendMessage(chatID, data) {
  return await chat_model.findByIdAndUpdate(chatID, {
    $push: { messages: data },
  })
}

module.exports = { getByUserID, create, sendMessage }
