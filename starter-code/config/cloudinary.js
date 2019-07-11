// config/ cloudinary.js

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// });

cloudinary.config({
    cloud_name: 'patjordao',
    api_key: '854861983724829',
    api_secret: 'wVY-rqUuImlJH1Z1jkXlpQqH0og'
  });

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'samples', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;