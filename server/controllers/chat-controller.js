const chat_service = require('../services/chat-service')

async function getByUserID(req, res) {
  try {
    const result = await chat_service.getByUserID(req.params.id)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function create(req, res) {
  const { users } = req.body

  const payload = {
    users,
  }

  try {
    const result = await chat_service.create(payload)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

async function sendMessage(req, res) {
  const { authorID, message } = req.body

  const payload = {
    authorID,
    message,
  }

  try {
    await chat_service.sendMessage(req.params.id, payload)

    return res.status(200).json('Successfully updated')
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Bir hata meydana geldi',
    })
  }
}

module.exports = {
  // get,
  // getByID,
  getByUserID,
  create,
  sendMessage,
}
