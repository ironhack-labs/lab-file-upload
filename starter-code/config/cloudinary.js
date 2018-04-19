require("dotenv").config();

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "IronHack",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    photo = new Date().getTime();
    cb(undefined, photo);
  }
});

const uploadCloud = multer({ storage: storage })
module.exports = uploadCloud;