const express    = require(`express`),
      postRoutes = express.Router(),
      Post       = require(`../models/Post`),
      multer     = require(`../helpers/multer`),
      { ensureLoggedIn } = require('connect-ensure-login');

postRoutes.post(`/profile`, ensureLoggedIn(`/login`), multer.single(`picPath`), (req,res) => {
  req.body.creatorId = req.user._id;
  if (req.file !== undefined) req.body.picPath = req.file.url;
  Post.create(req.body)
      .then(() => res.redirect(`/profile`))
      .catch(err => res.render(`/profile`, {err, errorMessage: `There was a problema creating the post`}));
});

module.exports = postRoutes;