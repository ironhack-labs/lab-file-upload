const express = require('express')
const router = express.Router()
const User = require('../models/user')

/* GET home page. */
router.get('/', (req, res, next) => {
	User.find({})
		.then(allUsers => res.render('index', { title: 'Express - Generated with IronGenerator', users: allUsers }))
		.catch(err => console.log(err))
})

module.exports = router
