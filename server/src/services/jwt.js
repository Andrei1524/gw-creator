const jwt = require('jsonwebtoken')

const accessTokenExp = 1800

function createAccessToken(user) {
  return jwt.sign({ username: user.username }, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: accessTokenExp})
}

function createRefreshToken(user) {
  return jwt.sign({username: user.username}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: 60 * 60 * 24 * 30}) // 30days
}

module.exports = {
  createAccessToken,
  createRefreshToken
}
