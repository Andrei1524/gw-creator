const express = require('express')
const dashboardRouter = express.Router()

// middleware
const { authenticateJWT } = require('../../middleware/authenticateJWT')

// controllers
const { httpGetDashboard } = require('./dasboard.controller')

dashboardRouter.post('/', authenticateJWT, httpGetDashboard)

module.exports = dashboardRouter
