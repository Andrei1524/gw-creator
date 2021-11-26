const { registerUser } = require('../../models/user.model')

async function httpRegister(req, res) {
  try {
    const user = req.body
    await registerUser(user)
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).json({error: err.message})
  }
}

module.exports = {
  httpRegister
}
