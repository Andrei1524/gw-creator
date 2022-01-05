const express = require('express')
const giveawaysRouter = express.Router()

// middleware
const { authenticateJWT } = require('../../middleware/authenticateJWT')
const { checkIfOwner } = require('../../middleware/levelChecks')
const { isGiveawayOpen } = require('../../middleware/giveaways')

// controllers
const { httpCreateGiveaway, httpGetGiveaways, httpGetGiveaway, httpEnrollInGiveaway, httpGetEnrolledUsers } = require('./giveaways.controller')
const { httpCreateTestGiveaway } = require('./gwTestFunctions.controller')

giveawaysRouter.post('/create_giveaway', authenticateJWT, httpCreateGiveaway)
giveawaysRouter.get('/', httpGetGiveaways)
giveawaysRouter.get('/:id', httpGetGiveaway)
giveawaysRouter.post('/:id/enroll', authenticateJWT, isGiveawayOpen, httpEnrollInGiveaway)
giveawaysRouter.get('/:id/enrolled_users', httpGetEnrolledUsers)

// testing functions
giveawaysRouter.post('/create_test_giveaway', authenticateJWT, checkIfOwner, httpCreateTestGiveaway)

module.exports = giveawaysRouter
