const isLoggedin = (req, res, next) => {
  if(req.session.user) {
    console.log("loginMid 3")
    next()
  } else {
    console.log("loginMid 6")
    res.render('users/create-post')
  }
}

module.exports = isLoggedin