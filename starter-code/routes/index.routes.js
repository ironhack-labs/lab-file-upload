const express = require('express')
const router = express.Router()
const Post = require('../models/post.model')

/* GET home page. */
router.get('/', (req, res) => {
	Post.find()
		.populate('creatorId')
		.then((allPosts) => res.render('index', { allPosts }))
		.catch((err) => console.log('No se encontraron posts', err))
})

router.get('/surprise', (req, res, next) => {
	res.send('Holiiii! Ya sepo hasé visualizaciones de detalles, promise. Hoy me apetece descansar.')
})

module.exports = router
