const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dqfytofoz",
  api_key: "254745397522785",
  api_secret: "8ClImg24uDzBETKngh4FHnIuGnI"
});

let storageCloud = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "userImages", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storageCloud });

module.exports = uploadCloud;
