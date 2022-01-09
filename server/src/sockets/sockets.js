const Giveaway = require('../models/giveaways/giveaway.mongo')

function listen(io) {
  const giveawayNameSpace = io.of('/giveaway')
  giveawayNameSpace.on('connection', (socket) => {
    let room

    console.log('user connected', socket.id)

    socket.on('ready', (generatedId) => {
      // canvas ready
      room = 'room_' + generatedId
      socket.join(room)
    })

    socket.on('spin', async (generatedId) => {
      const foundGiveaway = await Giveaway
        .findOne({ generatedId: generatedId })
        .populate('enrolled_users')
        .select(['-password', '-refreshToken', '-email'])
        .lean().exec()

      const winner = draw(foundGiveaway.enrolled_users)
      console.log(winner)

      const wheelUsersSize = 100
      const rectWidth = 75;
      const gap = 5;
      const rects = generateWheelRects(foundGiveaway.enrolled_users, rectWidth, gap)

      console.log(rects)
      // check if there are enough users enrolled, if not, randomize users until 100 is filled for the roulette
      // if (foundGiveaway.enrolled_users.length < wheelUsersSize) {
      //
      // }


      // socket.to(room).emit('spin', )
    })

    // socket.on('disconnect', (reason) => {
    //   console.log(`client ${socket.id} disconnected: ${reason}`)
    //   socket.leave(room)
    // })
  })
}

function draw(enrolledUsers) {
  const randomWinnerNr = Math.floor(Math.random() * (enrolledUsers.length + 1));
  // spinStart = winnerRect.x - (canvas.width / 2) + Math.floor(Math.random() * (rectWidth - 10)) + 1;
  // rects[winnerIndex].isWinner = true;
  return enrolledUsers[randomWinnerNr]
}

function generateWheelRects(enrolledUsers, rectWidth, gap) {
  let rects = []
  let startRectX = 0;

  for (let i = 0; i < enrolledUsers.length; i++) {
    rects.push({
      id: i,
      x: startRectX,
      username: enrolledUsers[i].username
    });
    startRectX += rectWidth + gap;
  }

  return rects
}

module.exports = {
  listen
}
