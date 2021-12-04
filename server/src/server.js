const http = require('http')
const io = require('socket.io')

require('dotenv').config()

const appServer = require('./app')
const { mongoConnect } = require('./services/mongo')

const httpServer = http.createServer(appServer)
const socketServer = io(httpServer, {
  cors: {
    origin: '*'
  }
})

const sockets = require('./sockets')
const PORT = process.env.PORT || 3000

async function startServer() { // putem folosi asta oricand avem nevoie sa facem ceva task inainte sa porneasca serverul
  // wait for data then server start listening
  await mongoConnect()

  httpServer.listen(PORT, () => {
    console.log('server listening on port, ', PORT)
  })
  sockets.listen(socketServer)
}

startServer()
