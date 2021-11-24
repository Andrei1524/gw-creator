function listen(io) {
  const homepageCases = io.of('/homepageCases')

  homepageCases.on('connection', (socket) => {
    console.log("user connected")
  })
}

module.exports = {
  listen
}
