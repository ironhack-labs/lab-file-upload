const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "user-pictures",
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    // console.log("request =>", req);
    // console.log("file =>", file);
    cb(null, file.originalname);
    // The file on cloudinary would have the same name as the original file name
  }
  // params below is only needed if uploading media types other than images (video, audio...)
  // params: {
  //     ressource_type: "raw"
  // }
});

const fileUploader = multer({ storage }); // this function makes the upload process possible !!!!

module.exports = fileUploader;