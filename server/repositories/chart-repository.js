const chart_model = require('../models/chart')

async function get(public) {
  if (public) {
    return await chart_model
      .find({ private: false, users: { $size: 1 } })
      .populate('users.user', 'username rating')
  } else {
    return await chart_model.find({})
  }
}

async function getByID(id) {
  return await chart_model.findById({ _id: id }).populate('users.user', 'email')
}

async function getByUserID(id) {
  return await chart_model
    .find({ 'users.user': id })
    .populate('users.user', 'username')
}

async function create(chart) {
  var createdChart = await chart_model.create(chart)

  if (chart.private) {
    createdChart.private = true
    await update(createdChart._id, createdChart)
    return await getByID(createdChart._id)
  } else if (chart.ai) {
    createdChart.ai = true
    createdChart.private = true
    await update(createdChart._id, createdChart)
    return await getByID(createdChart._id)
  } else {
    return createdChart
  }
}

async function update(id, chart) {
  return await chart_model.findOneAndUpdate({ _id: id }, chart)
}

async function remove(id) {
  return await chart_model.deleteOne({ _id: id })
}

async function updateTime(id, data) {
  var chart = await getByID(id)
  chart.users.map((userInfo) => {
    userInfo.time = data[userInfo.user.id]
  })
  return await update(id, chart)
}

module.exports = {
  get,
  getByID,
  getByUserID,
  create,
  update,
  remove,
  updateTime,
}
