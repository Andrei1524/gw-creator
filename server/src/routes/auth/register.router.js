const express = require('express')
const registerRouter = express.Router()

// controllers
const { httpRegister } = require('./register.controller')

registerRouter.post('/', httpRegister)

module.exports = registerRouter
