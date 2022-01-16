const Giveaway = require('./giveaway.mongo')
const agenda = require('../../services/agenda')
const add = require('date-fns/add')
const { nanoid } = require('nanoid')
const { giveawayStatuses } = require('../../utils/statuses')
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
      generatedId: nanoid(8),
      gw_type: giveaway.gw_type,
      nr_of_participants: giveaway.nr_of_participants,
      nr_of_winners: giveaway.nr_of_winners,
      pick_winner_method: giveaway.pick_winner_method,
      isRouletteRolling: false,
      rouletteEnded: false,
      winner: null,
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

async function getGiveaways(req, res, page) {
  if (!page) throw  Error('page is required') // TODO: refactor this repetition on pagination
  if (page <= 0) page = 1

  const skip = (page - 1) * PAGE_SIZE
  return await Giveaway.find({})
    .skip(skip)
    .limit(PAGE_SIZE)
    .sort({createdAt: 'descending'})
    .populate('created_by', 'username')
    .exec()
}

async function getGiveaway(req, res, generatedId) {
  return await Giveaway.findOne({generatedId}).populate('winner').lean().exec()
}

async function enrollUserInGiveaway(req, res, generatedId) {
  const currentLoggedInUser = req.user

  // check if logged user is already in giveaway
  let isUserAlreadyInGiveaway = false
  const foundGiveaway = await Giveaway.findOne({generatedId}).exec()
  isUserAlreadyInGiveaway = foundGiveaway.enrolled_users.includes(currentLoggedInUser._id)

  if (!isUserAlreadyInGiveaway) {
    await Giveaway.findOneAndUpdate({generatedId: generatedId}, {
      $push: { enrolled_users: currentLoggedInUser._id }
    })
  } else {
    throw Error('already enrolled')
  }
}

async function getGiveawayEnrolledUsers(req, res, generatedId, page) {
  if (page <= 0) page = 1

  const skip = (page - 1) * PAGE_SIZE

  let foundGiveaway

  if (page) {
    foundGiveaway = await Giveaway.findOne({generatedId})
      .populate([{
        path: 'enrolled_users',
        select: ['-password', '-refreshToken', '-email'],
        model: 'User',
        options: {
          skip: skip,
          limit : PAGE_SIZE
        },
      }]) // 'enrolled_users', ['-password', '-refreshToken', '-email']
      .lean()
      .exec()
  } else {
    foundGiveaway = await Giveaway.findOne({generatedId})
      .populate([{
        path: 'enrolled_users',
        select: ['-password', '-refreshToken', '-email'],
        model: 'User',
      }]) // 'enrolled_users', ['-password', '-refreshToken', '-email']
      .lean()
      .exec()
  }
  return foundGiveaway.enrolled_users
}

module.exports = {
  createGiveaway,
  scheduleGiveaway,
  getGiveaways,
  getGiveaway,
  enrollUserInGiveaway,
  getGiveawayEnrolledUsers
}
