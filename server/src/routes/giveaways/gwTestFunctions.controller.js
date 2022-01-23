let _ = require('lodash');
// const { PAGE_SIZE } = require('../../config')

const { createTestGiveaway, resetRoulette } = require('../../models/giveaways/gwTestFunctions.model')
// const Giveaway = require('../../models/giveaways/giveaway.mongo')

async function httpCreateTestGiveaway(req, res) {
  try {
    await createTestGiveaway(req, res)
    res.status(200).json('created test giveaway')
  } catch (err) {
    return res.status(401).json({error: err.message})
  }
}

async function httpResetRoulette(req, res) {
  try {
    await resetRoulette(req.body.generatedId)
    res.status(200).json('reseted the roulette')
  } catch (err) {
    return res.status(401).json({error: err.message})
  }
}

module.exports = {
  httpCreateTestGiveaway,
  httpResetRoulette
}
