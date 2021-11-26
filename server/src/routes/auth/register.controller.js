const { registerUser } = require('../../models/user.model')

async function httpRegister(req, res) {
  const user = req.body
  await registerUser(user)
  return res.sendStatus(200)
}

module.exports = {
  httpRegister
}
