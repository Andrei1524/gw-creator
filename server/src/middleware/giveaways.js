const Giveaway = require('../models/giveaways/giveaway.mongo')

const isGiveawayOpen = async (req, res, next) => {
  const foundGiveaway = await Giveaway.findOne({ generatedId: req.params.id }).lean().exec()

  if (foundGiveaway.status === 'open') { // TODO: put these statuses into utils
    next()
  } else {
    res.status(403).json({
      error: 'giveaway is closed'
    })
  }
}

module.exports = {
  isGiveawayOpen
}
