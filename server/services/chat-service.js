const chat_repository = require('../repositories/chat-repository')

// async function get(public) {
//   return await chart_repository.get(public)
// }

async function getByUserID(userID) {
  return await chat_repository.getByUserID(userID)
}

async function create(users) {
  return await chat_repository.create(users)
}

async function sendMessage(id, data) {
  return await chat_repository.sendMessage(id, data)
}

// async function remove(id) {
//   return await chart_repository.remove(id)
// }

// async function updateTime(id, data) {
//   return await chart_repository.updateTime(id, data)
// }

module.exports = { getByUserID, create, sendMessage }
