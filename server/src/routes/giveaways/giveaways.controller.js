let _ = require('lodash');

const { createGiveaway } = require('../../models/giveaways/giveaway.model')

async function httpCreateGiveaway(req, res) {
 try {
   const giveaway = req.body
   await createGiveaway(giveaway)
   res.sendStatus(200)
 } catch (err) {
   return res.status(401).json({error: err.message})
 }
}

module.exports = {
  httpCreateGiveaway
}
