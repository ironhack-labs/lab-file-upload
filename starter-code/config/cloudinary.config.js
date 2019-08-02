const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "dnrd0awl4",
  api_key: "545156256761969",
  api_secret: "Qjt5ShMPPHUuFEQKSWWb6OFuZVc"
});

var storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Project Cloudinary', 
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({ storage: storageCloud });

module.exports = uploadCloud;