require('dotenv').config();
const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.API_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'tumblr',
  allowedFormats: ['jpg', 'jpeg', 'png'],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
