const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:"dvyrddksd",
  api_key:"912915259479741",
  api_secret:"EfLtafHQz07siaJDDCr6BNLJnKo"
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'assets', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png','jpeg','gif','pdf'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

// const uploadCloud = multer({ storage: storage }).single('file');

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;