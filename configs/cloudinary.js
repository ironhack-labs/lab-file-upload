
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage}= require ('multer-storage-cloudinary')
//multer is a storage engine for cloudinary
const multer= require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: (req, file) => {
      return {
          folder: "tumblr",
          allowed_formats: ["jpg", "png"],
          public_id: `app-${file.originalname}`
      }
  }
});

const uploadCloud = multer({ storage });
module.exports= uploadCloud