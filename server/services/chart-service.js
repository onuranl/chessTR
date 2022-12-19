const chart_repository = require('../repositories/chart-repository')

async function get(public) {
  return await chart_repository.get(public)
}

async function getByID(id) {
  return await chart_repository.getByID(id)
}

async function getByUserID(id) {
  return await chart_repository.getByUserID(id)
}

async function create(chart) {
  var createdChart = await chart_repository.create(chart)


  if (chart.private) {
    createdChart.private = true

    await update(createdChart._id, createdChart)

    return await getByID(createdChart._id)
  }

  if (chart.ai) {
    createdChart.ai = true
    createdChart.private = true

    await update(createdChart._id, createdChart)

    return await getByID(createdChart._id)
  }

  return createdChart
}

async function update(id, chart) {
  return await chart_repository.update(id, chart)
}

async function remove(id) {
  return await chart_repository.remove(id)
}

async function updatePlayers(id, payload) {
  return await chart_repository.updatePlayers(id, payload)
}

async function updateAudience(id, user) {
  return await chart_repository.updateAudience(id, user)
}

async function updateChatMessages(id, msg) {
  return await chart_repository.updateChatMessages(id, msg)
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
  updatePlayers,
  updateAudience,
  updateChatMessages,
  updateTime,
}
