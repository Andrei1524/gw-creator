const Giveaway = require('./giveaway.mongo')
const User = require('../user.mongo')
const agenda = require('../../services/agenda')
const add = require('date-fns/add')
const { nanoid } = require('nanoid')
const { giveawayStatuses } = require('../../utils/statuses')
const { PAGE_SIZE } = require('../../config')

async function createTestGiveaway(req, res) {
  try {
    let totalSeconds = 0.50 * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);

    const end_date = add(new Date(), {
      hours: hours,
      minutes: minutes
    })

    // create test giveaway
    let nrOfUsers = 150
    let randomName = `test: ${Math.floor(Math.random() * nrOfUsers)}`
    let listOfGeneratedUsers = await generateUsers(nrOfUsers)

    const newGiveaway = await new Giveaway({
      available: 'public',
      description: randomName,
      duration: 0.50,
      end_date,
      giveaway_name: randomName,
      generatedId: nanoid(8),
      gw_type: 'fast',
      nr_of_participants: 50,
      nr_of_winners: 1,
      pick_winner_method: 'automatic',
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

module.exports = {
  createTestGiveaway,
}
