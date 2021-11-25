// const { registerUser } = require('../../models/user.model')

async function httpGetDashboard(req, res) {
  console.log(req.user)
  return res.status(200).json('dashboard')
}

module.exports = {
  httpGetDashboard
}
