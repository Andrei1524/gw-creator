const Giveaway = require('../models/user.mongo')

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
      // const rects = [];
      // const nrOfEnrolled = 25;
      //
      //
      // const foundGiveaway = await Giveaway.findOne({generatedId: generatedId}).lean().exec()
      // nrOfEnrolled = foundGiveaway.enrolled_users.length

      // socket.to(room).emit('spin', )
    })

    // socket.on('disconnect', (reason) => {
    //   console.log(`client ${socket.id} disconnected: ${reason}`)
    //   socket.leave(room)
    // })
  })
}

// function generateRects(enroll) {
//   for (let i = 0; i < nrOfEnrolled; i++) {
//     rects.push({
//       id: i,
//       x: startRectX
//     });
//     startRectX += rectWidth + gap;
//   }
// }
// generateRects();

module.exports = {
  listen
}
