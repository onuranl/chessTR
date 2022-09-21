const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rating: { type: Number, required: false, default: 1500 },
  },
  { timestamps: true }
)

UserSchema.set('toObject', { getters: true })
UserSchema.set('toJSON', { getters: true })

UserSchema.pre('save', function (next) {
  let user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          next(err)
        }

        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

UserSchema.methods.comparePassword = function (password, next) {
  let user = this
  return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('user', UserSchema)
