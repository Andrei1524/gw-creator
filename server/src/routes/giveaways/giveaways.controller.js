let _ = require('lodash');

const { createGiveaway, getGiveaways } = require('../../models/giveaways/giveaway.model')

async function httpCreateGiveaway(req, res) {
 try {
   const giveaway = req.body
   await createGiveaway(giveaway)
   res.sendStatus(200)
 } catch (err) {
   return res.status(401).json({error: err.message})
 }
}

async function httpGetGiveaways(req, res) {
  try {
    const { page } = req.query
    const giveaways = await getGiveaways(page)
    res.status(200).json(giveaways)
  } catch (err) {
    return res.status(422).json({error: err.message})
  }
}

module.exports = {
  httpCreateGiveaway,
  httpGetGiveaways
}
