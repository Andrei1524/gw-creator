const Giveaway = require('./giveaway.mongo')

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
      pick_winner_method: giveaway.pick_winner_method
    })

    await newGiveaway.save()
  } catch (err) {
    throw Error(err)
  }
}

async function scheduleGiveaway() {

}

module.exports = {
  createGiveaway,
  scheduleGiveaway
}
