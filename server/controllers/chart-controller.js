const chart_service = require('../services/chart-service')

async function get(req, res) {
  const public = req.route.path.indexOf('public') !== -1

  try {
    const result = await chart_service.get(public)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function getByID(req, res) {
  try {
    const result = await chart_service.getByID(req.params.id)

    if (result === null) {
      return res.status(400).json({
        status: false,
        error: `There is no chart for this id (${req.params.id})`,
      })
    } else {
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function getByUserID(req, res) {
  try {
    const result = await chart_service.getByUserID(req.params.id)

    if (result === null) {
      return res.status(400).json({
        status: false,
        error: `There is no chart for this user (${req.params.id})`,
      })
    } else {
      return res.status(200).json(result)
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function create(req, res) {
  const private = req.route.path.indexOf('private') !== -1
  const ai = req.route.path.indexOf('ai') !== -1

  const { chartHistory } = req.body

  const payload = {
    chartHistory,
    private,
    ai,
  }

  try {
    const result = await chart_service.create(payload)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function update(req, res) {
  try {
    await chart_service.update(req.params.id, req.body)

    return res.status(200).json('Successfully updated')
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function remove(req, res) {
  try {
    await chart_service.remove(req.params.id)

    return res.status(200).json('Successfully canceled')
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function updateTime(req, res) {
  try {
    await chart_service.updateTime(req.params.id, req.body)

    return res.status(200).json('Successfully updated time')
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
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
