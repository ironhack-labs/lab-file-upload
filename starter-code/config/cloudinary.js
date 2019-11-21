const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "duczhwe2w",
  api_key: "962985775565246",
  api_secret: "dYXYzvzXlSE5O0GNMvyQd7s84Vw"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads', 
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;