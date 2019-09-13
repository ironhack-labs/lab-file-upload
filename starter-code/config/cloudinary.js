// File upload
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
cloudinary.config({
 cloud_name: process.env.CLOUDINARY_API_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
 cloudinary,
 folder: '/lab-file-upload',
 allowedFormats: [ 'jpg', 'png' ]
 // filename: (req, file, callback) => {
 //   callback(null, file.originalname);
 // }
});
// const upload = multer({ dest: './uploads' });
const upload = multer({ storage });

module.exports = upload;

