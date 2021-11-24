const User = require('./user.mongo')

async function registerUser(user) {
  try {
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password
    })

    return await newUser.save()
  } catch (err) {
    console.error(`Could not register user: ${err}`)
  }
}

module.exports = {
  registerUser,
}
