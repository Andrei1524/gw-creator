const express = require('express')
const app = express()
const path = require('path')

const cors = require('cors')
const morgan = require('morgan')

const api = require('./routes/api')

app.use(cors({
  origin: ['http://localhost:8000', 'https://pacific-wave-83469.herokuapp.com'] // allow only this client to acces our server
}))

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
}

app.use(express.json()) // if we use json data
// server public nuxt code
app.use(express.static(path.join(__dirname, '..', 'dist')))

app.use('/v1', api)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

module.exports = app
