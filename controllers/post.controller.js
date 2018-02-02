const User = require('../models/user.model');
const Picture = require('../models/picture.model');
const mongoose = require('mongoose');

module.exports.index = (req, res, next) => {
  res.render('post/index');
};

module.exports.create = (req, res, next) => {
  res.render('post/new');
};

module.exports.doCreate = (req, res, next) => {
  if (!req.file) {
    res.render('post/new', {
      error: {
        photo: 'Photo is required'
      }
    });
  } else {
    const pic = new Picture({
      content: req.body.content,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.body.pic_name,
      _creator: req.user._id
    });
    const file_name = req.file.originalname;
    if (!pic.content || !pic.pic_path || !pic.pic_name) {
      res.render('post/new', {
        error: {
          content: pic.content ? '' : 'Content is required',
          pic_path: pic.pic_path ? '' : 'Name is required',
          pic_name: pic.pic_name ? '' : 'Picture name is required'
        }
      });
    }
    pic.save()
      .then(() => {
        res.redirect('/posts');
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('error', {
            message:"Error in save a picture in DB",
            error: error.errors
          });
        } else {
          next(error);
        }
      });
    // else {
    //   pic.save()
    //     .then(() => {
    //       //falta flash
    //       res.redirect('/post/index');
    //     })
    //     .catch(error => {
    //       if (error) {
    //         console.log(error);
    //         res.redirect('/error');
    //       }
    //     });
    // }
  }
};