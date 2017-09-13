const passport        = require('passport')
const LocalStrategy   = require('passport-local').Strategy
const User            = require('../models/user')

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err) }
    cb(null, user)
  })
})
