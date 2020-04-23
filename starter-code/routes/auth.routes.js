const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const multer = require('multer')
const uploadPic = multer({ dest: './public/uploads/' })

const Post = require('../models/post.model')

router.get('/login', ensureLoggedOut(), (req, res) => {
	res.render('authentication/login', { message: req.flash('error') })
})

router.post(
	'/login',
	ensureLoggedOut(),
	passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true,
	})
)

router.get('/signup', ensureLoggedOut(), (req, res) => {
	res.render('authentication/signup', { message: req.flash('error') })
})

router.post('/signup', ensureLoggedOut(), uploadPic.single('profilePic'), passport.authenticate('local-signup', { successRedirect: '/profile', failureRedirect: '/signup', failureFlash: true }))

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
	res.render('authentication/profile', {
		user: req.user,
	})
})

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
	req.logout()
	res.redirect('/')
})

router.get('/post-comment', (req, res, next) => res.render('authentication/post'))
router.post('/post-comment', uploadPic.single('picPath'), (req, res, next) => {
	const { content } = req.body

	Post.create({
		content,
		creatorId: req.user.id,
		picPath: `/uploads/${req.file.filename}`,
	})
		.then(() => res.redirect('/'))
		.catch((err) => console.log('Hubo un error creando el post', err))
	
})


module.exports = router
