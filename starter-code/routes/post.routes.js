const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config')

const User = require('../models/user')
const Post = require('../models/post.model')

router.get('/', (req, res, next) => {
    Post.find()
    //.populate('creatorId')
      .then(allThePost => {
        console.log("Hola soy la respuesta" ,allThePost)  
        res.render('post-index', { allThePost })})  
      .catch(err => console.log('Hubo un error:', err))
})

router.get('/new', ensureLoggedIn(), (req, res) => {
    res.render('new-post', { message: req.flash('error')});
});

router.post('/new', uploadCloud.single('picPath'), (req, res, next) => {
    const newPost = new Post({
		// hacemos console.log(req.body) para ver todos los datos que nos estan dando
		content: req.body.content,
		creatorId: req.user._id,
		picPath: req.file.secure_url,
		picName: req.file.originalname
	});

    newPost.save()
    .then(() => res.redirect('/'))
    .catch((err) => console.log('An error ocurred saving', err));
});


module.exports = router;