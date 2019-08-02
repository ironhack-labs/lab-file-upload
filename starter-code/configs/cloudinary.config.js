const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");






cloudinary.config({
  cloud_name: "rebecals",
  api_key: "643876327244982",
  api_secret: "lLuUodfQNlvTvzNTc4xijl9Aqgk"
});


var storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Mis fotos", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});


const uploadCloud = multer({ storage: storageCloud });

module.exports = uploadCloud;
