const http = require('http')

// require('dotenv').config()

const app = require('./app')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

async function startServer() { // putem folosi asta oricand avem nevoie sa facem ceva task inainte sa porneasca serverul
  // wait for data then server start listening
  // await mongoConnect()
  // await loadPlanetsData()
  // await loadLaunchesData()

  server.listen(PORT, () => {
    console.log('listening on port, ', PORT)
  })
}

startServer()
// app.listen()
