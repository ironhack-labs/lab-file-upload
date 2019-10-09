const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config(
  {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  }
);

const storage = cloudinaryStorage(
  {
    cloudinary: cloudinary,
    folder: 'lab-file-upload',
    allowedFormats: ['jpg', 'png', 'jpeg', 'pdf'],
    filename: function (req, file, cb) {
    cb(null, file.originalname);
    }
  }
);

module.exports = multer({ storage });