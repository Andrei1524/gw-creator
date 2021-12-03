const express = require('express')
const giveawaysRouter = express.Router()

// middleware
const { authenticateJWT } = require('../../middleware/authenticateJWT')

// controllers
const { httpCreateGiveaway } = require('./giveaways.controller')

giveawaysRouter.post('/create_giveaway', authenticateJWT, httpCreateGiveaway)

module.exports = giveawaysRouter
