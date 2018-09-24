const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:"dn3s8lyeh",
  api_key: '767159691198498',
  api_secret: 'lYZMg3GOcw5SGpiI0c7pwKrFRGk'
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'profile pictures',
  allowedFormats: ['jpg', 'png', 'gif'],
  filename: (req, file, cb)=> {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;