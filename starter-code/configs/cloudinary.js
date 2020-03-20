const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config()

console.log(process.env)
console.log("this is the cloudinary name:", process.env.CLOUDINARY_NAME)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'ironhack-lab', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;