const express = require('express')

//routers
const authRouter = require('./auth/auth.router')
const dashboardRouter = require('./dashboard/dashboard.router')
const userRouter = require('./user/user.router')
const giveawaysRouter = require('./giveaways/giveaways.router')

const api = express.Router()

api.use('/auth', authRouter)
api.use('/currentUser', userRouter)
api.use('/dashboard', dashboardRouter)
api.use('/giveaways', giveawaysRouter)

api.get('*', (req, res) =>  {
  res.status(404).json({error: 'not found'})
});

module.exports = api
