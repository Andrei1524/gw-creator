const express = require('express')

//routers
const registerRouter = require('./auth/register.router')

const api = express.Router()

api.use('/register', registerRouter)

module.exports = api
