let _ = require('lodash');

const { getCurrentUser } = require('../../models/user.model')

async function httpGetCurrentUser(req, res) {
  let currentUser = await getCurrentUser(req, res)
  _.unset(currentUser, 'password')

  if (currentUser) {
    return res.status(200).json({user: currentUser})
  } else {
    return res.status(400)
  }
}

module.exports = {
  httpGetCurrentUser
}
