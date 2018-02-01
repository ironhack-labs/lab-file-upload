const User = require('../models/user.model');
const Picture = require('../models/picture.model');


module.exports.show = (req, res, next) => {
  res.render('user/profile', {
    user: req.user
  });
};
module.exports.upload = (req, res, next) => {
  // res.send("req.user._id==="+req.user._id)
  const pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
    _creator: req.user._id
  });

  pic.save()
    .then(() => {
      res.redirect('/user/profile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.send('/error');
      }
    });
};