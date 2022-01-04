const { userLevels } = require('../utils/userLevels')

const checkIfOwner = (req, res, next) => {
  if (req.user.level === userLevels.OWNER) {
    next()
  } else {
    return res.sendStatus(403)
  }
}

module.exports = {
  checkIfOwner
}
