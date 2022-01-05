const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  refreshToken: {
    type: String,
    required: false
  },

  level: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('User', userSchema)
