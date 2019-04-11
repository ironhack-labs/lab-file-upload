const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDSECRET
});

var storageProfilePictures = cloudinaryStorage({
  cloudinary,
  folder: 'profile-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, req.file);
  }
});

var storagePostPictures = cloudinaryStorage({
  cloudinary,
  folder: 'post-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, req.file);
  }
});

var storageCommentPictures = cloudinaryStorage({
  cloudinary,
  folder: 'comment-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, req.file);
  }
});

const uploadProfilePicture = multer({ storage: storageProfilePictures });
const uploadPostPicture = multer({storage: storagePostPictures});
const uploadCommentPicture = multer({storage: storageCommentPictures})


module.exports = {
  uploadProfilePicture,
  uploadPostPicture,
  uploadCommentPicture
}
