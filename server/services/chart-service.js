const chart_repository = require('../repositories/chart-repository')

async function get(isPublic) {
  return await chart_repository.get(isPublic)
}

async function getByID(id) {
  return await chart_repository.getByID(id)
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

module.exports = { get, getByID, create, update, remove, updateTime }
