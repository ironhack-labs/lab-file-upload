const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config')

const User = require('../models/user')
const Post = require('../models/post.model')
const Comment = require('../models/comments.model')

router.get('/', (req, res, next) => {
    Comment.find()
    .populate('authorId')
      .then(allTheComments => {
        console.log("Hola soy la respuesta" ,allTheComments)  
        res.render('post-index', { allTheComments })})  
      .catch(err => console.log('Hubo un error:', err))
})

router.get('/new', ensureLoggedIn(), (req, res) => {
    res.render('new-post', { message: req.flash('error')});
});

router.post('/new', uploadCloud.single('picPath'), (req, res, next) => {
    const newComment = new Comment({
		
		content: req.body.content,
		authorId: req.user._id,
		imagePath: req.file.secure_url,
		imageName: req.file.originalname
	});

    newComment.save()
    .then(() => res.redirect('/'))
    .catch((err) => console.log('An error ocurred saving', err));
});


module.exports = router;