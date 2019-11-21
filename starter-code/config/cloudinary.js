const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: "canaryorange",
  api_key: "237663734344855",
  api_secret: "_Pc-kBFpVgd-3sROXX7MlRlZH7o",
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