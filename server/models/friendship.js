const mongoose = require('mongoose')

const FriendshipSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: 'pending',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('friendships', FriendshipSchema)
