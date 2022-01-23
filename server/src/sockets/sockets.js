const Giveaway = require('../models/giveaways/giveaway.mongo')

function listen(io) {
  const giveawayNameSpace = io.of('/giveaway')

  giveawayNameSpace.on('connection', async (socket) => {
    let room
    let rollWithEase = 0;
    let rects = []

    const rectWidth = 75;
    const gap = 5;
    const wheelUsersSize = 100

    let winner = null
    let foundGiveaway = null

    socket.on('ready', async (generatedId, canvasWidth) => {
      foundGiveaway = await Giveaway // TODO: refactor this + keep final state of the roullete
        .findOne({ generatedId: generatedId })
        .populate('enrolled_users')
        .populate('winner')
        .select(['-password', '-refreshToken', '-email'])
        .lean().exec()

      // canvas ready
      room = 'room_' + generatedId
      socket.join(room)

      if (foundGiveaway.winner && foundGiveaway.isRouletteRolling) {
        winner = foundGiveaway.winner
        winner.isWinner = true
        rects = generateWheelRects(foundGiveaway.enrolled_users, winner, rectWidth, gap)
        giveawayNameSpace.in(room).emit('newGeneratedRects', rects, foundGiveaway.randomWinnerStop)
      } else {
        rects = generateWheelRects(foundGiveaway.enrolled_users, null, rectWidth, gap)
        giveawayNameSpace.in(room).emit('newGeneratedRects', rects)
      }
    })

    socket.on('startSpin', async (generatedId, canvasWidth) => {
      // allow spin if user wasn't extracted yet
      console.log(foundGiveaway.winner)
      if (!foundGiveaway.winner) {
        await spin(generatedId, canvasWidth)
      } else {
        console.log("already extracted")
      }
    })

    async function spin(generatedId, canvasWidth) {
      // check if winner has been already extracted
      const [ winnerFromDraw, winnerXPos ] = draw(foundGiveaway.enrolled_users, rectWidth, gap)
      winner = winnerFromDraw

      rects = generateWheelRects(foundGiveaway.enrolled_users, winner, rectWidth, gap)

      // update Giveaway winners
      const updatedGiveaway = await Giveaway.findOneAndUpdate({generatedId: generatedId}, {
        winner: winner._id,
        isRouletteRolling: true,
        randomWinnerStop: Math.floor(Math.random() * (rectWidth - 10)) + 1
      }, {new:true}).populate('winner')

      // emit the new generated rects with the winner inside
      giveawayNameSpace.in(room).emit('newGeneratedRects', rects, updatedGiveaway.randomWinnerStop)

      // rollWhell variables
      let spinTime = 0
      let spinStart = winnerXPos
      let spinTimeTotal = 0;

      spinTimeTotal = winnerXPos * 7;

      let timeout = null
      let immediate = null
      async function rollWheel() {
        spinTime += 30;

        if (spinTime >= spinTimeTotal) {
          await Giveaway.findOneAndUpdate({generatedId: generatedId}, {
            winner: winner, // TODO: remove this when done testing -> winner: winner
            rouletteEnded: true, // set to 'true' after testing
            isRouletteRolling: false
          })

          giveawayNameSpace.in(room).emit('rouletteEnded', false, updatedGiveaway.winner)
        } else {
          const rollTimeWithEase = easeOutQuart(
            spinTime,
            0,
            spinStart,
            spinTimeTotal
          );
          rollWithEase = -rollTimeWithEase;

          giveawayNameSpace.in(room).emit('spin', rollWithEase)
        }
      }

      let tickLengthMs = 1000 / 60
      /* gameLoop related variables */
      // timestamp of each loop
      let previousTick = Date.now()
      // number of times gameLoop gets called
      let actualTicks = 0

      let gameLoop = function () {
        let now = Date.now()

        actualTicks++
        if (previousTick + tickLengthMs <= now) {
          let delta = (now - previousTick) / 1000
          previousTick = now

          if (spinTime >= spinTimeTotal) {
            clearTimeout(timeout)
            clearImmediate(immediate)
          } else {
            // console.log('still rolling')
            update(delta)
          }
          // console.log('delta', delta, '(target: ' + tickLengthMs +' ms)', 'node ticks', actualTicks)
          actualTicks = 0
        }

        if (Date.now() - previousTick < tickLengthMs - 16) {
          timeout = setTimeout(gameLoop)
        } else {
          immediate = setImmediate(gameLoop)
        }
      }

      let update = function(delta) {
        rollWheel()
      }

      gameLoop()
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

function generateWheelRects(enrolledUsers, winner, rectWidth, gap) {
  let rects = []
  let startRectX = 0;

  for (let i = 0; i < enrolledUsers.length; i++) {
    if (winner && enrolledUsers[i].username === winner.username) {
      rects.push({
        _id: enrolledUsers[i]._id,
        id: i,
        x: startRectX,
        username: enrolledUsers[i].username,
        isWinner: true
      });
    } else {
      rects.push({
        _id: enrolledUsers[i]._id,
        id: i,
        x: startRectX,
        username: enrolledUsers[i].username
      });
    }
    startRectX += rectWidth + gap;
  }

  return rects
}

function gameLoop() {

}

function queryGetGiveaway() {

}

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

module.exports = {
  listen
}
