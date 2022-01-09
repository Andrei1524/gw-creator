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

    socket.on('spin', () => {
      // socket.to(room).emit('spin', )
    })

    // socket.on('disconnect', (reason) => {
    //   console.log(`client ${socket.id} disconnected: ${reason}`)
    //   socket.leave(room)
    // })
  })
}

module.exports = {
  listen
}
