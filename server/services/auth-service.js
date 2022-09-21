const user_repository = require('../repositories/user-repository')
const jwt = require('jsonwebtoken')

async function register(user) {
  let isEmailExits = await user_repository.isEmailExits(user.email)

  if (isEmailExits) {
    throw new Error('Email is exits')
  }

  let isUsernameTaken = await user_repository.isUsernameTaken(user.email)

  if (isUsernameTaken) {
    throw new Error('Username is taken')
  }

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
