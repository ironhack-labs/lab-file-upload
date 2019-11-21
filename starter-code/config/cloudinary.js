require('dotenv');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: 'flor-i-ronhack',
  api_key: '423512172848149',
  api_secret: 'foOl3oLpemjRtEKUoHqWwSLElIQ'
});


var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'newFolder', 
  allowedFormats: ['jpg', 'png'],
 
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
