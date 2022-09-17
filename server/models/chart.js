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
          default: 'white',
          required: true,
        },
        time: {
          type: Number,
          default: 300000,
          required: false,
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
      default: 300000,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('charts', ChartSchema)
