const chart_repository = require("../repositories/chart-repository");

async function get() {
  return await chart_repository.get();
}

async function getByID(id) {
  return await chart_repository.getByID(id);
}

async function create(chart) {
  return await chart_repository.create(chart);
}

async function update(id, chart) {
  return await chart_repository.update(id, chart);
}

module.exports = { get, getByID, create, update };