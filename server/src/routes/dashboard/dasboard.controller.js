// const { registerUser } = require('../../models/user.model')

async function httpGetDashboard(req, res) {
  return res.status(200).json('dashboard')
}

module.exports = {
  httpGetDashboard
}
