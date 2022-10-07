const friendship_repostiory = require('../repositories/friendship-repository')

async function getRequests() {
  return await friendship_repostiory.getRequests()
}

async function getRequest(id) {
  return await friendship_repostiory.getRequest(id)
}

async function createRequest(users) {
  return await friendship_repostiory.createRequest(users)
}

async function updateRequest(id, status) {
  return await friendship_repostiory.updateRequest(id, status)
}

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
}
