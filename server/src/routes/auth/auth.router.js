const express = require('express')
const authRouter = express.Router()

// controllers
const { httpLogin, httpRegister, httpRefreshToken, httpLogout } = require('./auth.controller')

authRouter.post('/login', httpLogin)
authRouter.post('/register', httpRegister)
authRouter.post('/refresh_token', httpRefreshToken)
authRouter.post('/logout', httpLogout)

module.exports = authRouter
