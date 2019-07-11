
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: 'layzafloriano',
  api_key: '836832483455965',
  api_secret: '17qbPO6vwEjIvkLXf189CFVG-fA',
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profile', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
