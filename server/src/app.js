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
// server public react code
app.use(express.static(path.join(__dirname, '..', 'dist')))

app.use('/v1', api)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

const Agenda = require('agenda');

const dbURL = process.env.MONGO_URL

const agenda = new Agenda({
  db: {address: dbURL, collection: 'Agenda'},
  processEvery: '20 seconds',
  useUnifiedTopology: true
});

agenda.define('log hello medium', async job => {
  const { name } = job.attrs;

  console.log(`Hello ${name} 👋`);
});

(async function() {
  await agenda.start(); // Start Agenda instance

  await agenda.schedule('in 2 minutes', 'log hello medium', {name: 'Medium'});
})();


module.exports = app
