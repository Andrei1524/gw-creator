const Giveaway = require('./giveaway.mongo')
const agenda = require('../../services/agenda')
const { giveawayStatuses } = require('../../utils/statuses')
const add = require('date-fns/add')
const { PAGE_SIZE } = require('../../config')

async function createGiveaway(req, res, giveaway) {
  try {
    let totalSeconds = giveaway.duration * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);

    const end_date = add(new Date(), {
      hours: hours,
      minutes: minutes
    })

    const newGiveaway = await new Giveaway({
      available: giveaway.available,
      description: giveaway.description,
      duration: giveaway.duration,
      end_date,
      giveaway_name: giveaway.giveaway_name,
      gw_type: giveaway.gw_type,
      nr_of_participants: giveaway.nr_of_participants,
      nr_of_winners: giveaway.nr_of_winners,
      pick_winner_method: giveaway.pick_winner_method,
      created_by: req.user._id,
      status: giveawayStatuses.OPEN
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

async function getGiveaways(page) {
  if (!page) throw  Error('page is required')
  if (page <= 0) page = 1

  const skip = (page - 1) * PAGE_SIZE
  return Giveaway.find({})
    .skip(skip)
    .limit(PAGE_SIZE)
    .sort({createdAt: 'descending'})
    .populate('created_by', 'username')
    .exec()
}
module.exports = {
  createGiveaway,
  scheduleGiveaway,
  getGiveaways
}
