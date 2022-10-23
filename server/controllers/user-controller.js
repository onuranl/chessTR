const user_service = require('../services/user-service')

async function user(req, res) {
  const id = req.userID
  try {
    const result = await user_service.getUserByID(id)
    if (result) {
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

async function updateUser(req, res) {
  try {
    const result = await user_service.updateUser(req.body)
    if (result) {
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

async function getAllUsers(req, res) {
  try {
    const result = await user_service.getAllUsers()
    if (result) {
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

async function getUserByUsername(req, res) {
  try {
    const result = await user_service.getUserByUsername(req.params.slug)
    if (result) {
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

module.exports = { user, updateUser, getUserByUsername, getAllUsers }
