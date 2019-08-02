const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
require("dotenv")

cloudinary.config({
  cloud_name: "ebg-ester",
  api_key: "641218458474528",
  api_secret: "KzItRJSuiPPwAxDlHMK0FD5WOl8"
});

var storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'webmad0719', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storageCloud });

module.exports = uploadCloud;