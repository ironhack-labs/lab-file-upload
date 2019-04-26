const router = require("express").Router();
const passport = require('../handlers/passport')
const User = require('../models/User')
const { sendConfimationCode } = require('../handlers/nodemailer')
const uploadCloud = require('../handlers/cloudinary')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get("/signup", (req, res, next) => {
  const config = { title: 'Sign up', action: '/signup', sign: true }
  res.render("auth/sign", config)
});

router.get("/login", (req, res, next) => {
  const config = { title: 'Log in',  action: '/login' }
  res.render("auth/sign", config)
});

router.get('/', (req, res, next)=> {
  Post.find()
  .then(posts => {
    res.render('index', { posts })
  })
  .catch(err => console.log(err))
  // Comment.find()
  // .then(comments => {
  //   res.render('index', { comments })
  // })
  // .catch(err => {
  //   res.send(err)
  // })
})

router.get('/allcomments', (req, res, next)=> {
  Comment.find()
  .then(comments => {
    res.render('comments/allcomments', { comments })
  })
  .catch(err => {
    res.send(err)
  })
})


router.get('/post', (req, res, next) => {
  res.render('post/post')
})

router.get('/comment', (req, res, next) => {
  res.render('comments/comment')
})

router.post('/post', uploadCloud.single('picPath'), (req, res, next) => {
  Post.create({...req.body, picPath: req.file.secure_url})
  .then(post => {
    res.redirect('/')
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/comment', uploadCloud.single('imagePath'),(req, res, next) => {
  Comment.create({...req.body, imagePath: req.file.secure_url})
  .then(comments => {
    res.redirect('/')
  })
  .catch(err=> res.send(err))
})

router.post('/signup', uploadCloud.single('photoURL'), (req, res, next) => {
  User.register({ ...req.body, photoURL: req.file.secure_url },req.body.password )
    .then(user => {
      const confirmationCode = token
      User.findByIdAndUpdate(user._id, { confirmationCode }, { new: true })
        .then(updatedUser => {
          sendConfimationCode(
            updatedUser.email,
            `
            <p> Please click on the link </p>
            <a href="http://localhost:3000/activate/${
              updatedUser.confirmationCode
            }">CLICK HERE</a>
          `
          )
            .then(() => res.send('Correo enviado'))
            .catch(err => next(err))
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/')
})

router.get('/profile', isActive, (req, res, next) => {
  res.send(`
    <img src="${req.user.photoURL}">
  `) 
})

router.get('/activate/:confirmationCode', (req, res, next) => {
  const { confirmationCode } = req.params
  User.findOneAndUpdate({ confirmationCode }, { status: 'Active'}, { new: true })
  .then(() => {res.redirect('/login')})
  .catch(err => next(err))
})

function isActive(req, res, next){
  if(!req.isAuthenticated()){
    return res.redirect('/login')
  }
  if(req.user.status !== 'Active') return res.send('Revisa el correo para confirmar la cuenta')
  next()
}

let token = '';
let characters = 'hfjsbdjhsdbjh34947bsdnbvxjhb347dh'
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length )];
}

module.exports = router;
