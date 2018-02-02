const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.show = (req, res, next) => {
  User.findById(req.params.id)
  .then((user)=>{
    res.render('user/profile', {
      flash: req.flash(),
      user
    });
  });
  
};
module.exports.update = (req, res, next) => {
  res.render('user/update');
};
module.exports.doUpdate = (req, res, next) => {
  const {
    email,
    imgUrl,
    name
  } = req.body;
  const id = req.params.id;
  if (!email || !name || !imgUrl) {
    res.render('user/update', {
      error: {
        email: email ? '' : 'Email is required',
        name: name ? '' : 'Name is required',
        imgUrl: imgUrl ? '' : 'Image URL is required'
      }
    });
  } else {
    User.findById(req.params.id)
      .then(user => {
        if (user == null) {
          res.render('user/update', {
            error: {
              name: 'That em@il doesnt exists'
            }
          });
        } else if ((req.user._id).equals(req.params.id) != true) {
          let error = new Error("You dont have permisions!");
          next(error);
        } else {
          user.email = email;
          user.name = name;
          user.imgUrl = imgUrl;
          user.save()
            .then(() => {
              res.redirect('/users/' + req.user._id);
            }).catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                res.render('error', {
                  error,
                  message:"It wasnt possible update"
                });
              } else {
                next(error);
              }
            });
        }
      })
      .catch(error => next(error));
  }
};
