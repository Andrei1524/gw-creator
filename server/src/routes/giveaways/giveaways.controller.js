let _ = require('lodash');
const { PAGE_SIZE } = require('../../config')

const { createGiveaway, getGiveaways, getGiveaway } = require('../../models/giveaways/giveaway.model')
const Giveaway = require('../../models/giveaways/giveaway.mongo')

async function httpCreateGiveaway(req, res) {
 try {
   const giveaway = req.body
   await createGiveaway(req, res, giveaway)
   res.sendStatus(200)
 } catch (err) {
   return res.status(401).json({error: err.message})
 }
}

async function httpGetGiveaways(req, res) {
  try {
    const { page } = req.query
    // set pagination settings
    const total_items = await Giveaway.countDocuments({}).exec()

    const giveaways = await getGiveaways(req, res, page)
    res.status(200).json({
      giveaways, total_items, PAGE_SIZE
    })
  } catch (err) {
    return res.status(422).json({error: err.message})
  }
}

async function httpGetGiveaway(req, res) {
  try {
    const giveaway = await getGiveaway(req, res, req.params.id)
    res.status(200).json(giveaway)
  } catch (err) {
    return res.status(422).json({error: err.message})
  }
}

module.exports = {
  httpCreateGiveaway,
  httpGetGiveaways,
  httpGetGiveaway
}
