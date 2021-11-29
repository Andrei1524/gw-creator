const express = require('express')
const userRouter = express.Router()

// middleware
const { authenticateJWT } = require('../../middleware/authenticateJWT')

// controllers
const { httpGetCurrentUser } = require('./user.controller')

userRouter.get('/', authenticateJWT, httpGetCurrentUser)

module.exports = userRouter
