const Giveaway = require('../models/giveaways/giveaway.mongo')

function listen(io) {
  const giveawayNameSpace = io.of('/giveaway')

  giveawayNameSpace.on('connection', async (socket) => {
    let room
    let rects = []

    const rectWidth = 75;
    const gap = 5;
    const wheelUsersSize = 100

    let winner = null
    let foundGiveaway = null

    socket.on('ready', async (generatedId, canvasWidth) => {

    })

    socket.on('startSpin', async (generatedId, canvasWidth) => {

    })

    async function roll(generatedId, canvasWidth) {

    }

    socket.on('disconnect', (reason) => {
      socket.leave(room)
    })
  })
}

function draw(enrolledUsers, rectWidth, gap) {
  const randomWinnerNr = Math.floor(Math.random() * (enrolledUsers.length + 1));
  // spinStart = winnerRect.x - (canvas.width / 2) + Math.floor(Math.random() * (rectWidth - 10)) + 1;
  // rects[winnerIndex].isWinner = true;
  return [enrolledUsers[randomWinnerNr], randomWinnerNr * (rectWidth + gap)]
}

function generateWheelDivs(enrolledUsers, winner, rectWidth, gap) {
  let divs = []
  let startRectX = 0;

  for (let i = 0; i < enrolledUsers.length; i++) {
    // TODO: generate divs
    startRectX += rectWidth + gap;
  }

  return divs
}

async function queryGetGiveaway(generatedId) {
  return await Giveaway
    .findOne({ generatedId: generatedId })
    .populate('enrolled_users')
    .populate('winner')
    .select(['-password', '-refreshToken', '-email'])
    .lean().exec()
}

module.exports = {
  listen
}
