const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    type: String,
    authorID: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    message: String,
  },
  { timestamps: true }
)

const ChatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
    messages: [MessageSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('chats', ChatSchema)
