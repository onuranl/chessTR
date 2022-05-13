const user_repository = require('../repositories/user-repository')
const jwt = require('jsonwebtoken')

async function register(user) {
  let result = await user_repository.createUser(user)

  jwt.sign(result.toJSON(), process.env.TOKEN_SECRET, {
    expiresIn: 604800,
  })

  return result
}

async function login(user) {
  try {
    let foundUser = await user_repository.login(user)

    if (!foundUser) {
      throw new Error('Kullanıcı bulunamadı')
    } else {
      if (foundUser.comparePassword(user.password)) {
        const token = jwt.sign(foundUser.toJSON(), process.env.TOKEN_SECRET, {
          expiresIn: 604800,
        })

        return { foundUser, token }
      } else {
        throw new Error('Şifre yanlış')
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = { register, login }
