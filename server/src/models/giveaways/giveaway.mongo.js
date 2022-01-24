const mongoose = require('mongoose')
const Schema = mongoose.Schema

const giveawaySchema = new mongoose.Schema({
  available: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: false
  },

  duration: {
    type: Number,
    required: true
  },

  end_date: {
    type: String,
    required: false
  },

  giveaway_name: {
    type: String,
    required: true
  },

  generatedId: {
    type: String,
    required: true
  },

  gw_type: {
    type: String,
    required: true
  },

  nr_of_participants: {
    type: Number,
    required: true
  },

  enrolled_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  nr_of_winners: {
    type: Number,
    required: true
  },

  winner: { type: Schema.Types.ObjectId, ref: 'User' },

  isRouletteRolling: {
    type: Boolean,
    required: true
  },

  rouletteEnded: {
    type: Boolean,
    required: true
  },

  randomWinnerStop: {
    type: Number,
    required: false
  },

  pick_winner_method: {
    type: String,
    required: true
  },

  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  status: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Giveaway', giveawaySchema)
