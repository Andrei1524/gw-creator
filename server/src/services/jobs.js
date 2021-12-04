module.exports = (agenda) => {
  agenda.define('schedule_giveaway', async (job, done) => {
    console.log(`giveaway ended 👋`)
    done()
  });
}
