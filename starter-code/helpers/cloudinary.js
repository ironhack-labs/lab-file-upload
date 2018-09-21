const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dtawbk4r1',
  api_key: '788533973565826',
  api_secret: 'z5QYYWm8yerQRR52MePJHr4Wlr4'
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'Profile_pictures', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb)=> {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;