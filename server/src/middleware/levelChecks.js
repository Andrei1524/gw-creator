const { userLevels } = require('../utils/userLevels')

const checkIfAdmin = (req, res, next) => {
  if (req.user.level === userLevels.OWNER) {
    next()
  } else {
    return res.sendStatus(403)
  }
}

module.exports = {
  checkIfAdmin
}
