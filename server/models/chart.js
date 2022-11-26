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

const ChartSchema = new mongoose.Schema(
  {
    chartHistory: {
      type: Object,
      required: false,
      default: {
        legal_white: 20,
        checks_white: 0,
        threat_white: 0,
        turn: 'white',
        history: [],
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      },
    },
    users: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        color: {
          type: String,
          required: true,
          default: 'white',
        },
        time: {
          type: Number,
          required: false,
          default: -1,
        },
      },
      { _id: false },
    ],
    audience: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    increment: {
      type: Number,
      required: false,
      default: 0
    },
    chat: [MessageSchema],
    private: {
      type: Boolean,
      required: false,
      default: false,
    },
    ai: {
      type: Boolean,
      required: false,
      default: false,
    },
    aiColor: {
      type: String,
      required: false,
      default: null,
    },
    aiTime: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('charts', ChartSchema)
