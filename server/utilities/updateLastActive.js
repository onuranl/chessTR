const user_model = require('../models/user')

const updateLastActive = async function (user) {
  user.active = new Date()

  await user_model.findByIdAndUpdate(user._id, user)
}

module.exports = updateLastActive
