const express = require('express')
const router = express.Router()
const { getAllPosts, getCreate, publishPost } = require('../controllers/profile.controller')
/* GET home page. */
router.get('/', getAllPosts)

router.get('/create', getCreate)

router.get('/show', (req, res, next) => {
  res.render('show')
})

router.post('/create', publishPost)

module.exports = router
