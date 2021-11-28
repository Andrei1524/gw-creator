const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/user.mongo');

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      // assign current user details to the req
      req.user = await User.findOne({ username: user.username }).lean().exec()
      _.unset(req.user, 'password')

      if (req.user) {
        next();
      } else {
        return res.sendStatus(403)
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJWT
}
