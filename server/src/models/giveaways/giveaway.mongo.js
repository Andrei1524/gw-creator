const mongoose = require('mongoose')

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

  gw_type: {
    type: String,
    required: true
  },

  nr_of_participants: {
    type: Number,
    required: true
  },

  nr_of_winners: {
    type: Number,
    required: true
  },

  pick_winner_method: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Giveaway', giveawaySchema)
