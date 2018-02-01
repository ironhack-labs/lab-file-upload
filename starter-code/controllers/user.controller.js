const User = require('../models/user.model');
const Picture = require('../models/picture.model');


module.exports.show = (req, res, next) => {

  Picture.find({
      _creator: req.user._id
    })
    .then((picture) => {
      if (picture.length!==0) {
        res.render('user/profile', {
          user: req.user,
          picture: picture[0]
        });
      } else {
        res.render('user/profile', {
          user: req.user
        });
      }
    })
    .catch(error => next(error));
};
module.exports.upload = (req, res, next) => {
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
      if (error) {
        console.log(error);
        res.redirect('/error');
      }
    });
};