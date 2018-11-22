// config/ cloudinary.js

//remember, we have to import multer-storage-cloudinary in order to work with cloudinary
//remember to create an account in cloudinary
//then you'll need the cloud name, the cloudinary key and the secret
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

//reading the cloudinary values from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

//cloudinaryStorage config. please see its API via https://www.npmjs.com/package/multer-storage-cloudinary
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  //remember you can create your custom filename pattern
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;