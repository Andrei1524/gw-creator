const User = require('./user.mongo')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

async function registerUser(user) {
  try {
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
    console.error(`Could not register user: ${err}`)
  }
}

async function loginUser(loginData) {
  try {
    const {username, password} = loginData
    const user = await User.findOne({ username }).exec()

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if(user && passwordsMatch) {
      return jwt.sign({ username: user.username }, process.env.JWT_SECRET)
    } else {
      return false
    }
  } catch (err) {
    throw new Error(`Could not register user: ${err}`)
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
