const { registerUser } = require('../../models/user.model')

async function httpRegister(req, res) {
  const user = req.body
  const registeredUser = await registerUser(user)

  return res.status(200).json(registeredUser)
}

module.exports = {
  httpRegister
}
