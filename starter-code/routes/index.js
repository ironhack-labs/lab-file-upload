const express = require('express');
const router  = express.Router();
const Post = require('../models/post');



/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .then((posts) =>{
    res.render('post/index', { posts});
  })
  .catch((err) => console.log(err))
});


// router.post('/new', (req, res, next) => {
//   // const { content, creatorId, picName, picPath } = req.body;
//   console.log(req.body, 'kkkkkkkkkkkkkkk');
//   console.log(req.file, 'kkkkkkkkkkkkkkk');
//   // Post.create(new Post({
//   //   content,
//   //   creatorId,
//   //   picName,
//   //   picPath,
//   // }))
//   // .then(() => {
//   // })
//   // .catch(err => console.log(err));
// });

module.exports = router;
