const User = require('../models/User')
const passport = require('passport')


exports.signupView = (req,res,next) => {
  res.render('auth/signup')
}

exports.loginView = (req,res,next) => {
  res.render('auth/login')
}


/*
router.post('/signup', ensureLoggedOut(),upload.single('photoURL'), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));
*/

/*
exports.signup = async (req, res) => {
  const {username, email, password, photoURL} = req.body;
  console.log(req.body)
  console.log('user', req.body);

  if (email === "" || password === "") {
    res.render('auth/signup', {
        message: 'Campos incompletos'
    })
  }
  const userOnDB = await User.findOne({ email });
  if (userOnDB !== null) {
    res.render("auth/signup", { message: "El correo ya fue registrado" });
  }
  await User.register({username, email, password, photoURL}, password);
  res.redirect("/auth/login");
};
*/