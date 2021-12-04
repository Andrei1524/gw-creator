const Giveaway = require('./giveaway.mongo')
const agenda = require('../../services/agenda')

async function createGiveaway(giveaway) {
  try {
    // const newGiveaway = await new Giveaway({
    //   available: giveaway.available,
    //   description: giveaway.description,
    //   duration: giveaway.duration,
    //   giveaway_name: giveaway.giveaway_name,
    //   gw_type: giveaway.gw_type,
    //   nr_of_participants: giveaway.nr_of_participants,
    //   nr_of_winners: giveaway.nr_of_winners,
    //   pick_winner_method: giveaway.pick_winner_method
    // })
    //
    // await newGiveaway.save()
    await scheduleGiveaway(giveaway)
  } catch (err) {
    throw Error(err)
  }
}

async function scheduleGiveaway(giveaway) {
  await agenda.schedule('in one minute', 'schedule_giveaway')
}
module.exports = {
  createGiveaway,
  scheduleGiveaway
}
