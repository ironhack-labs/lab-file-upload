const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_ID,
  api_secret: process.env.CLOUDINARY_PWD
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    return {
      folder: "intro",
      allowed_formats: ['jpg', 'png'],
      public_id: `app-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

module.exports = upload;