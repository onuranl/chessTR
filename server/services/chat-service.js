const chat_repository = require('../repositories/chat-repository')

async function getByUserID(userID) {
  return await chat_repository.getByUserID(userID)
}

async function create(users) {
  return await chat_repository.create(users)
}

async function sendMessage(id, data) {
  return await chat_repository.sendMessage(id, data)
}

module.exports = { getByUserID, create, sendMessage }
