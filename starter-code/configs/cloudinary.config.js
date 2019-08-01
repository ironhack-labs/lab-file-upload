const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dfevkaska',
  api_key: '225261717772338',
  api_secret: 'EWxjkryX9jwtNwcN4-WaOgsP0vA'
});

var storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'inma-01-08', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storageCloud });

module.exports = uploadCloud;