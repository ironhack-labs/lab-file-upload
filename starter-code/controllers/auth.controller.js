const User = require('../models/User')
const passport = require('passport')

exports.loginView = (req,res,next) => {
    res.render('authentication/login', { message: req.flash('error')})
}

exports.loginPost = passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/profile'
  })

exports.signupView = (req,res,next) => {
    res.render('authentication/signup', { message: req.flash('error')})
}

exports.signupPost = async (req,res,next) => {
    const {username, email, password} = req.body
    const { secure_url: imgURL } = req.file
    await User.register({username, email, imgURL}, password)
    res.redirect('/login')
}

exports.profileView = (req,res,next) => {
    res.render('authentication/profile', req.user)
}

exports.logout = (req,res,next) => {
    req.logout();
    res.redirect('/login');
}