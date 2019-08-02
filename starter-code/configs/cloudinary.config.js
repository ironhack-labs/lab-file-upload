const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "ivan1984",
  api_key: "949325565531985",
  api_secret: "Rh4jQG73OLso_PF3g5LgX6OFb_s"
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