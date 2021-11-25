const express = require('express')
const loginRouter = express.Router()

// controllers
const { httpLogin } = require('./login.controller')

loginRouter.post('/', httpLogin)

module.exports = loginRouter
