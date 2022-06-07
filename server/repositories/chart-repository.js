const chart_model = require('../models/chart')

async function get() {
  return await chart_model.find({})
}

async function getByID(id) {
  return await chart_model.findById({ _id: id }).populate('users.user', 'email')
}

async function create(chart) {
  return await chart_model.create(chart)
}

async function update(id, chart) {
  return await chart_model.findOneAndUpdate({ _id: id }, chart)
}

async function sendMessage(chartID, message) {
  let result = await chart_model.findOneAndUpdate(
    { _id: chartID },
    { $push: { chat: message } }
  )
}

module.exports = { get, getByID, create, update, sendMessage }
