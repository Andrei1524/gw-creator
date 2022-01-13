const Giveaway = require('../models/giveaways/giveaway.mongo')

function listen(io) {
  const giveawayNameSpace = io.of('/giveaway')

  giveawayNameSpace.on('connection', (socket) => {
    let room
    let rollWithEase = 0;
    let rects = []

    const rectWidth = 75;
    const gap = 5;
    const wheelUsersSize = 100

    let winner = null
    let isRouletteRolling = false //TODO: find way to keep roullete state
    console.log('user connected', socket.id)

    socket.on('ready', async (generatedId, canvasWidth) => {
      const foundGiveaway = await Giveaway // TODO: refactor this + keep final state of the roullete
        .findOne({ generatedId: generatedId })
        .populate('enrolled_users')
        .select(['-password', '-refreshToken', '-email'])
        .lean().exec()

      // canvas ready
      room = 'room_' + generatedId
      socket.join(room)

      rects = generateWheelRects(foundGiveaway.enrolled_users, null, rectWidth, gap)
      giveawayNameSpace.in(room).emit('newGeneratedRects', rects)

      if (!isRouletteRolling) {
        isRouletteRolling = true
        giveawayNameSpace.in(room).emit('winnerRect', winner)
      }

    })

    socket.on('startSpin', async (generatedId, canvasWidth) => {
      await spin(generatedId, canvasWidth)
    })

    async function spin(generatedId, canvasWidth) {
      const foundGiveaway = await Giveaway // TODO: refactor this
        .findOne({ generatedId: generatedId })
        .populate('enrolled_users')
        .select(['-password', '-refreshToken', '-email'])
        .lean().exec()

      const [ winnerFromDraw, winnerXPos ] = draw(foundGiveaway.enrolled_users, rectWidth, gap)
      winner = winnerFromDraw
      rects = generateWheelRects(foundGiveaway.enrolled_users, winner, rectWidth, gap)

      // emit the new generated rects
      socket.emit('newGeneratedRects', rects)

      // rollWhell variables
      let spinTime = 0
      let spinStart = winnerXPos - (canvasWidth / 2) + Math.floor(Math.random() * (rectWidth - 10)) + 1;
      let spinTimeTotal = 0;

      spinTimeTotal = winnerXPos * 10;

      let timeout = null
      let immediate = null
      function rollWheel() {
        spinTime += 30;

        if (spinTime >= spinTimeTotal) {
          console.log("stopped isRouletteRolling", winner);
          isRouletteRolling = false

          // clearInterval(wheelTimer)
        } else {
          const rollTimeWithEase = easeOutQuart(
            spinTime,
            0,
            spinStart,
            spinTimeTotal
          );
          rollWithEase = -rollTimeWithEase;

          giveawayNameSpace.in(room).emit('spin', rollWithEase)
          // console.log(spinTime)
          // emit spinTime and receive on client
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
        id: i,
        x: startRectX,
        username: enrolledUsers[i].username,
        isWinner: true
      });
    } else {
      rects.push({
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

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

module.exports = {
  listen
}
