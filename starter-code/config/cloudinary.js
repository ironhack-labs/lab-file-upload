const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
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

const uploadProfilePicture = multer({ storage: storageProfilePictures })
const uploadPostPicture = multer({storage: storagePostPictures})

module.exports = {
  uploadProfilePicture,
  uploadPostPicture
}
