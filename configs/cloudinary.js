
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    // cloudinary: cloudinary,
    cloudinary,
    params: (req, file) => {
      return {
        folder: "lab-cloudinary", // The name of the folder in cloudinary
        allowedFormats: ['jpg', 'png'],
        public_id: `app-${file.originalname}`
      }
    }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;