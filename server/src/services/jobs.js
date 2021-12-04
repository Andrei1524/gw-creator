const Giveaway = require('../models/user.mongo')

const { giveawayStatuses } = require('../utils/statuses')

module.exports = (agenda) => {
  agenda.define('schedule_giveaway', async (job, done) => {
    const jobGiveawayID = job.attrs.data._id

    // close the giveaway on the date
    await Giveaway.findOneAndUpdate({id: jobGiveawayID}, {
      status: giveawayStatuses.CLOSED
    })
    done()
  });
}
