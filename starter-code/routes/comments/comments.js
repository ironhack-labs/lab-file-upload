const express = require('express');
const router  = express.Router();
const Comment = require('../../models/Comment')

router.get('/', (req, res, next) => {
  Comment.find()
  .then(comments=>{
    res.render('comments/list',{comments})
  })
  .catch(err=>{
    console.log(err)
  })
});

module.exports = router;