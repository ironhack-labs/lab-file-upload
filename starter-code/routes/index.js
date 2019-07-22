const express = require('express')
const router  = express.Router()

router.get('/', (req, res, next) => {
  console.log('HOOOME')
  res.render('index', { title: 'IronTumblr' })
})

module.exports = router
