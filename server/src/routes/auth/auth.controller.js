const { loginUser, registerUser, refreshToken, logout } = require('../../models/user.model')

async function httpLogin(req, res) {
  try {
    const loginData = req.body
    const { access_token, refresh_token } = await loginUser(loginData)
    return res.status(200).json({ access_token, refresh_token })
  } catch (err) {
    return res.status(400).json({error: err.message})
  }
}

async function httpRegister(req, res) {
  try {
    const user = req.body
    await registerUser(user)
    return res.sendStatus(200)
  } catch (err) {
    return res.status(400).json({error: err.message})
  }
}

async function httpRefreshToken(req, res) {
  try {
    const access_token = await refreshToken(req, res)
    return res.status(200).json({access_token})
  } catch (err) {
    return res.status(401).json({error: err.message})
  }
}

async function httpLogout(req, res) {
  try {
    const response = await logout(req, res)
    console.log(response)
    return res.sendStatus(204)
  } catch (err) {
    return res.status(401).json({error: err.message})
  }
}

module.exports = {
  httpRegister,
  httpLogin,
  httpRefreshToken,
  httpLogout
}
