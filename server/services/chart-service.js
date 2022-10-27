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
  return await chart_repository.create(chart)
}

async function update(id, chart) {
  return await chart_repository.update(id, chart)
}

async function remove(id) {
  return await chart_repository.remove(id)
}

async function updateTime(id, data) {
  return await chart_repository.updateTime(id, data)
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
