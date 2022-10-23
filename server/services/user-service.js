const user_repository = require('../repositories/user-repository')

async function getUserByID(id) {
  const user = await user_repository.getUser(id)

  if (!user) throw new Error('Kullanıcı bulunamadı.')
  return user
}

async function updateUser(user) {
  try {
    const { _id, username, email, links } = user
    const payload = { _id, username, email, links }

    return await user_repository.updateUser(payload)
  } catch (error) {
    console.log({ error })
  }
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

module.exports = {
  getUserByID,
  updateUser,
  getUserByUsername,
  getAllUsers,
  updateFriends,
}
