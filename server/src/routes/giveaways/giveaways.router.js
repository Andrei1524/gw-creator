const express = require('express')
const giveawaysRouter = express.Router()

// middleware
const { authenticateJWT } = require('../../middleware/authenticateJWT')

// controllers
const { httpCreateGiveaway, httpGetGiveaways, httpGetGiveaway, httpEnrollInGiveaway, httpGetEnrolledUsers } = require('./giveaways.controller')

giveawaysRouter.post('/create_giveaway', authenticateJWT, httpCreateGiveaway)
giveawaysRouter.get('/', httpGetGiveaways)
giveawaysRouter.get('/:id', httpGetGiveaway)
giveawaysRouter.post('/:id/enroll', authenticateJWT,  httpEnrollInGiveaway)
giveawaysRouter.get('/:id/enrolled_users', httpGetEnrolledUsers)

module.exports = giveawaysRouter
