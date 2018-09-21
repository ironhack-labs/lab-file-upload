const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Post = require("../models/post.js")
const upload = multer({ dest: './public/uploads/' });

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().then(e =>{
    res.render('index', {e});
  })
});

router.post('/',upload.single('photo'), (req, res, next) => {
  console.log("entra")
  const {
      content
  } = req.body;
  const {
      originalname,
      path
  } = req.file;
  const id = req.post.id;
  new Comment ({
          content,
          id,
          photo: {
              originalname,
              path
            }
      })
      .save().then(post => {
          res.redirect("/")
      }).catch(err => {
          next(err)
      })

});


module.exports = router;