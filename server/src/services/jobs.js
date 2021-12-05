const Giveaway = require('../models/giveaways/giveaway.mongo')

const { giveawayStatuses } = require('../utils/statuses')

module.exports = (agenda) => {
  agenda.define('schedule_giveaway', async (job, done) => {
    const giveaway_id = job.attrs.data.giveaway_id

    await Giveaway.findOneAndUpdate({_id: giveaway_id}, {status: giveawayStatuses.CLOSED})
    console.log('closed giveaway: ', giveaway_id)
    return done()
  });
}
