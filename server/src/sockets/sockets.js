function listen(io) {
  const giveawayNameSpace = io.of('/giveaway')
  giveawayNameSpace.on('connection', (socket) => {
    let room

    console.log('user connected', socket.id)

    // socket.on('ready', () => {
    //   // canvas ready
    // })

    // socket.on('ballMove', (ballData) => {
    //   socket.to(room).emit('ballMove', ballData)
    // })

    // socket.on('disconnect', (reason) => {
    //   console.log(`client ${socket.id} disconnected: ${reason}`)
    //   socket.leave(room)
    // })
  })
}

module.exports = {
  listen
}
