require("dotenv").config();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'lab-upload',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, `${Math.floor(Math.random * 3000)}`);
  }
});

const uploadCloud = multer({ storage: storage });
module.exports = uploadCloud;