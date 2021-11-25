const { loginUser } = require('../../models/user.model')

async function httpLogin(req, res) {
  const loginData = req.body
  const access_token = await loginUser(loginData)

  if (access_token) {
    return res.status(200).json({ access_token })
  } else {
    return res.status(400).json({
      error: "Invalid credentials"
    })
  }
}

module.exports = {
  httpLogin
}
