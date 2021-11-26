const { loginUser } = require('../../models/user.model')

async function httpLogin(req, res) {
  try {
    const loginData = req.body
    const access_token = await loginUser(loginData)
    return res.status(200).json({ access_token })
  } catch (err) {
    return res.status(400).json({error: err.message})
  }
}

module.exports = {
  httpLogin
}
