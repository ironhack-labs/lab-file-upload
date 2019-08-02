const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dlovcijth",
  api_key: "196115718625517",
  api_secret: "7yXJ7icEtaCm-SQu4t_-UA7HLYA"
});

var storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "chorrytumbler", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storageCloud });

module.exports = uploadCloud;
