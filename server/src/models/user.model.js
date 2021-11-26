const User = require('./user.mongo')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

async function registerUser(user) {
  try {
    // find if username is already in use
    const foundUserByUsername = await User.findOne({username: user.username}).lean().exec()
    const foundUserByEmail = await User.findOne({email: user.email}).lean().exec()

    if (foundUserByUsername || foundUserByEmail) {
      throw Error('A user with these credentials already exists')
    }

    const saltRounds = 11
    const password = user.password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword
    })

    await newUser.save()

  } catch (err) {
    throw Error(err)
  }
}

async function loginUser(loginData) {
  try {
    const {username, password} = loginData
    const user = await User.findOne({ username }).exec()

    if (!user) {
      throw Error('username and password combination is invalid')
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if(passwordsMatch) {
      return jwt.sign({ username: user.username }, process.env.JWT_SECRET)
    } else {
      throw Error('username and password combination is invalid')
    }
  } catch (err) {
    throw Error(err)
  }
}

async function getCurrentUser(req, res) {
  try {
    // Filter user from the users array by username and password
    const currentUser = await User.findOne({username: req.user.username}).lean().exec()
    if (currentUser) {
      return currentUser
    } else {
      return null
    }
  } catch (err) {
    throw new Error(`Could not get logged user: ${err}`)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
}
