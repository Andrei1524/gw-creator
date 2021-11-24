const express = require('express')
const registerRouter = express.Router()

// controllers
const { httpRegister } = require('./register.controller')

registerRouter.get('/', httpRegister)

module.exports = registerRouter
