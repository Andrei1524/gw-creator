const Giveaway = require('./giveaway.mongo')
const User = require('../user.mongo')
const agenda = require('../../services/agenda')
const add = require('date-fns/add')
const { nanoid } = require('nanoid')
const { giveawayStatuses } = require('../../utils/statuses')
const { PAGE_SIZE } = require('../../config')

async function createTestGiveaway(req, res) {
  try {
    let totalSeconds = 12 * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);

    const end_date = add(new Date(), {
      hours: hours,
      minutes: minutes
    })

    // create test giveaway
    let nrOfUsers = 100
    let randomName = `test: ${Math.floor(Math.random() * nrOfUsers)}`
    let listOfGeneratedUsers = await generateUsers(nrOfUsers)

    const newGiveaway = await new Giveaway({
      available: 'public',
      description: randomName,
      duration: 12,
      end_date,
      giveaway_name: randomName,
      generatedId: nanoid(8),
      gw_type: 'fast',
      nr_of_participants: 50,
      nr_of_winners: 1,
      pick_winner_method: 'automatic',
      isRouletteRolling: false,
      rouletteEnded: false,
      winner: null,
      created_by: req.user._id,
      status: giveawayStatuses.OPEN,
      enrolled_users: listOfGeneratedUsers
    })

    newGiveaway.save().then(async savedGiveaway => {
      await scheduleGiveaway(savedGiveaway)
    })
  } catch (err) {
    throw Error(err)
  }
}

async function scheduleGiveaway(giveaway) {
  await agenda.schedule(giveaway.end_date, 'schedule_giveaway', {giveaway_id: giveaway.id})
}

async function generateUsers(nrOfNewUsers) {
  let generatedUsersIds = []

  for (let i = 0; i < nrOfNewUsers; i++) {
    let newGeneratedUsername = `generatedUser: ${i}`
    let newGeneratedUser = await User.findOneAndUpdate({ username: newGeneratedUsername }, {}, {
      new: true,
      upsert: true // Make this update into an upsert
    });
    generatedUsersIds.push(newGeneratedUser._id)
  }

  return generatedUsersIds
}

async function resetRoulette(generatedId) {
  return Giveaway.findOneAndUpdate({ generatedId }, {
    winner: null,
    rouletteEnded: false,
    isRouletteRolling: false
  })
}

module.exports = {
  createTestGiveaway,
  resetRoulette
}
