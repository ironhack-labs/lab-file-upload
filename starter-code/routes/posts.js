const express    = require('express')
const passport   = require('passport')
const router     = express.Router()
const multer     = require('multer')
const Post       = require('../models/post')
const upload     = multer({ dest: './public/uploads/' })
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')


router.get('/new', (req, res) => {
    res.render('posts/new', { message: `New post`})
})
router.post('/new', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
  new Post({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: `/uploads/${req.file.filename}`,
    picName : req.file.originalname
  }).save()
    .then(res.redirect('/'))
    .catch(err => console.log(err))
})
module.exports = router
