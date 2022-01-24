const { userLevels } = require('../utils/userLevels')

const checkIfAdmin = (req, res, next) => {
  if (req.user.level === userLevels.OWNER) {
    next()
  } else {
    return res.status(403).json({error: "not an admin"})
  }
}

module.exports = {
  checkIfAdmin
}
