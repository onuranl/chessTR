const mongoose = require('mongoose')

function arrayLimit(val) {
  return val.length <= 2
}

const ChartSchema = new mongoose.Schema(
  {
    chartHistory: {
      type: Object,
      default: {
        legal_white: 20,
        checks_white: 0,
        threat_white: 0,
        turn: 'white',
        history: [],
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      },
    },
    users: {
      type: Array,
      default: [],
      validate: [arrayLimit, '{PATH} exceeds the limit of 2'],
    },
    audience: { type: Array, default: [] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('charts', ChartSchema)
