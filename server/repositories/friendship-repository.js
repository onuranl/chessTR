const friendship_model = require('../models/friendship')

async function getRequests() {
  return await friendship_model.find()
}

async function getRequest(id) {
  return await friendship_model
    .find({ $or: [{ _id: id }, { from: id }, { to: id }] })
    .populate('from to', 'username')
}

async function createRequest(users) {
  return await friendship_model.create(users)
}

async function updateRequest(id, status) {
  const request = await getRequest(id)

  request.status = status

  await request.save()
}

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
}
