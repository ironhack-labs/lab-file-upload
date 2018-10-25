const express       = require(`express`),
      commentRoutes = express.Router(),
      $Comment      = require(`../models/Comment`),
      multer        = require(`../helpers/multer`),
      { ensureLoggedIn } = require('connect-ensure-login');

commentRoutes.post(`/comment`, ensureLoggedIn(`/login`), multer.single(`imagePath`), (req,res) => {
  req.body.authorId  = req.user._id;
  if (req.file !== undefined) req.body.imagePath = req.file.url;
  // console.log(req);
  // res.json(req.body);
  // res.redirect(`/`);
  $Comment.create(req.body)
      .then(() => res.redirect(`/`))
      .catch(err => res.render(`/`, {err, errorMessage: `There was a problema creating the comment`}));
});

module.exports = commentRoutes;