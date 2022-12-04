const friendship_service = require('../services/friendship-service')
const user_service = require('../services/user-service')

async function getRequests(req, res) {
  try {
    const result = await friendship_service.getRequests()

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function getRequest(req, res) {
  try {
    const result = await friendship_service.getRequest(req.params.id)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function createRequest(req, res) {
  const { from, to } = req.body

  const payload = { from, to }

  try {
    const result = await friendship_service.createRequest(payload)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function updateRequest(req, res) {
  const { status } = req.body

  const payload = { status }
  try {
    const result = await friendship_service.updateRequest(
      req.params.id,
      payload
    )

    if (payload.status === 'accepted') {
      await user_service.updateFriends(result)
    }

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
}
