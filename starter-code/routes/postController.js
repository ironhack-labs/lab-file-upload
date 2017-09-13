const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer    = require('multer');
const upload    = multer({ dest: './public/uploads/' });
const moment    = require("moment");
const User      = require("../models/user");
const Post      = require("../models/post");


router.get("/profile", ensureLoggedIn('/login'), (req, res, next) => {
  User.findOne({ username: req.user.username }, "_id username")
    .exec((err, user) => {
      if (!user) { return; }
      Post.find({ "user_id": user._id })
      .then( posts => {
        res.render("authentication/profile", {user: req.user, posts, moment})
      }).catch( err => next(err))
  });
});

router.post('/profile', ensureLoggedIn('/login'), upload.single('photo'), (req, res,next) => {
  const user = req.user;
  User.findOne({ username: user.username })
  .then( response => {
    const newPost = Post({
      user_id: user._id,
      content: req.body.postText,
      user_name: user.username,
      picture: {
        pic_path: `/uploads/${req.file.filename}`,
        pic_name: req.file.originalname
      }
    })
    newPost.save((err) => {
      if (err) {
        res.render("authentication/profile", { user: user.username,
            // errorMessage: err.errors.post.message
          });
      } else {
        res.redirect("/profile");
      }
    });
  }).catch( err => next(err) )
});


module.exports = router;
