const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
 
});

var storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'webmad0719', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png','jpeg'],
  filename: function (req, file, cb) {
    cb(null); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storageCloud })

module.exports = uploadCloud