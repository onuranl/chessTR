const user_repository = require('../repositories/user-repository')

async function getUserByID(id) {
  const user = await user_repository.getUser(id)

  if (!user) throw new Error('Kullanıcı bulunamadı.')
  return user
}

async function updateUser(user) {
  const { _id, username, email, links, rating, matches, win, lose } = user
  const payload = { _id, username, email, links, rating, matches, win, lose }

  return await user_repository.updateUser(payload)
}

async function getAllUsers() {
  return await user_repository.getAllUsers()
}

async function getUserByUsername(username) {
  const user = await user_repository.getUserByUsername(username)

  if (!user) throw new Error('Kullanıcı bulunamadı.')

  return user
}

async function updateFriends(payload) {
  await user_repository.updateFriends(payload.from, payload.to)
  await user_repository.updateFriends(payload.to, payload.from)
}

async function updateLastActive(user) {
  if (user) await user_repository.updateLastActive(user)
}

module.exports = {
  getUserByID,
  updateUser,
  getUserByUsername,
  getAllUsers,
  updateFriends,
  updateLastActive,
}
