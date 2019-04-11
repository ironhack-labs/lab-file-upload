const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDSECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "lab-file-upload",
  allowedFormats: ["jpg", "png", "jpeg"],
  filename(req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

// mandamos a multer el storage
module.exports = multer({ storage });