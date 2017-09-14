const express    = require('express')
const passport   = require('passport')
const router     = express.Router()
const Comment    = require('../models/comment')
const Post       = require('../models/post')
const multer     = require('multer')
const upload     = multer({ dest: './public/uploads/' })
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

router.get('/new/:postId', ensureLoggedIn('/login'), (req, res) => {
  console.log('dentro del get new');
    res.render('comments/new', { message: `New comment`, postId: req.params.postId})
})

router.post('/new/:postId', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
  const newComment = new Comment({
    content: req.body.content,
    authorId: req.user._id,
    imagePath: req.file ? `/uploads/${req.file.filename}` : '',
    imageName: req.file ? req.file.originalname : ''
  })

  Post.findByIdAndUpdate(req.params.postId, {$push: { 'comments': newComment }})
    .then(res.redirect('/'))
    .catch(err => console.log(err))

})

module.exports = router
