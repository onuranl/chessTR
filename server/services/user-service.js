const user_repository = require('../repositories/user-repository')

async function getUserByID(id) {
  const user = await user_repository.getUser(id)

  if (!user) throw new Error('Kullanıcı bulunamadı.')
  return user
}

module.exports = { getUserByID }
