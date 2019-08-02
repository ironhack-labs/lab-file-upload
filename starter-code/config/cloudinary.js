const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:"dywochpvv",
  api_key:"295313985637813",
  api_secret:"e4GTvErCqauvgeW-HdO9H-wvFME"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'foto', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;