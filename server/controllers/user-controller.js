const user_service = require('../services/user-service')

async function user(req, res) {
  const id = req.userID
  try {
    const result = await user_service.getUserByID(id)
    if (user) {
      return res.json({
        status: true,
        user: result,
      })
    }
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    })
  }
}

module.exports = { user }
