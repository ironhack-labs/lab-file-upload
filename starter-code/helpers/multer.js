const cloudinary = require("cloudinary");
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require ('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDSECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'lab-pair',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

module.exports = multer({ storage });