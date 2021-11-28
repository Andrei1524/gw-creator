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

    // const refresh_token = jwt.sign({username: user.username}, process.env.JWT_REFRESH_TOKEN_SECRET)
    const refresh_token = null

    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      refreshToken: refresh_token
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
      const refresh_token = jwt.sign({username: user.username}, process.env.JWT_REFRESH_TOKEN_SECRET)
      const access_token = jwt.sign({ username: user.username }, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
      user.refreshToken = refresh_token
      user.save()
      return {
        refresh_token,
        access_token
      }
    } else {
      throw Error('username and password combination is invalid')
    }
  } catch (err) {
    throw Error(err)
  }
}

async function refreshToken(req, res) {
  try {
    const refresh_token = req.body.refresh_token

    if (refresh_token === null || !refresh_token) {
      throw Error('token not present')
    }

    const foundUserByRefreshToken = await User.findOne({refreshToken: refresh_token}).lean().exec()
    if (!foundUserByRefreshToken) {
      throw Error('token not found')
    }

    return jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) throw Error(err)
      return jwt.sign({ username: foundUserByRefreshToken.username }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
    })

  } catch (err) {
    throw Error(err)
  }
}

async function logout(req, res) {
  try {
    const refresh_token = req.body.refresh_token

    await User.findOneAndUpdate({refreshToken: refresh_token}, {
      refreshToken: null
    }).exec()

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
    throw Error(`Could not get logged user: ${err}`)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logout,
  refreshToken
}
