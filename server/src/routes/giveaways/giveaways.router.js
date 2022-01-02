const express = require('express')
const giveawaysRouter = express.Router()

// middleware
const { authenticateJWT } = require('../../middleware/authenticateJWT')

// controllers
const { httpCreateGiveaway, httpGetGiveaways, httpGetGiveaway } = require('./giveaways.controller')

giveawaysRouter.post('/create_giveaway', authenticateJWT, httpCreateGiveaway)
giveawaysRouter.get('/', httpGetGiveaways)
giveawaysRouter.get('/:id', httpGetGiveaway)

module.exports = giveawaysRouter
