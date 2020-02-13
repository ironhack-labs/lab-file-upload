require("dotenv").config()

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

console.log("hola1", process.env.CLOUDINARY_NAME)
console.log(process.env.CLOUDINARY_KEY)
console.log(process.env.CLOUDINARY_SECRET)

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'folder-name', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    //remember you can create your custom filename pattern
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});

const uploadCloud = multer({
    storage: storage
});

module.exports = uploadCloud;