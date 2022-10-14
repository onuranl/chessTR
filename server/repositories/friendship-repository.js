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
  return await friendship_model.findOneAndUpdate(
    { $or: [{ _id: id }, { from: id }, { to: id }] },
    status
  )
}

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
}
