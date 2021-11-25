const express = require('express')

//routers
const registerRouter = require('./auth/register.router')
const loginRouter = require('./auth/login.router')
const dashboardRouter = require('./dashboard/dashboard.router')
const userRouter = require('./user/user.router')

const api = express.Router()

api.use('/register', registerRouter)
api.use('/login', loginRouter)
api.use('/currentUser', userRouter)

api.use('/dashboard', dashboardRouter)

module.exports = api
