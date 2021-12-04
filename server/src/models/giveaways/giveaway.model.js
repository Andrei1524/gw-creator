const Giveaway = require('./giveaway.mongo')
const agenda = require('../../services/agenda')
const { giveawayStatuses } = require('../../utils/statuses')

async function createGiveaway(giveaway) {
  try {
    const newGiveaway = await new Giveaway({
      available: giveaway.available,
      description: giveaway.description,
      duration: giveaway.duration,
      giveaway_name: giveaway.giveaway_name,
      gw_type: giveaway.gw_type,
      nr_of_participants: giveaway.nr_of_participants,
      nr_of_winners: giveaway.nr_of_winners,
      pick_winner_method: giveaway.pick_winner_method,
      status: giveawayStatuses.OPEN
    })

    await newGiveaway.save()
    await scheduleGiveaway(giveaway)
  } catch (err) {
    throw Error(err)
  }
}

async function scheduleGiveaway(giveaway) {
  // TODO: pass giveaway ID to the job to close it
  // its not working currently, not closing the giveaway
  await agenda.schedule('in one minute', 'schedule_giveaway', {giveaway_id: giveaway._id})
}
module.exports = {
  createGiveaway,
  scheduleGiveaway
}
