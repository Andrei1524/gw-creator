const Agenda = require('agenda');

const dbURL = process.env.MONGO_URL

const agenda = new Agenda({
  db: {address: dbURL, collection: 'Agenda'},
  processEvery: '20 seconds',
  useUnifiedTopology: true
});

require('./jobs')(agenda)

agenda.on("ready", async () => await agenda.start())

let graceful = () => {
  agenda.stop(() => process.exit(0))
};

process.on("SIGTERM", graceful)
process.on("SIGINT", graceful)
module.exports = agenda
