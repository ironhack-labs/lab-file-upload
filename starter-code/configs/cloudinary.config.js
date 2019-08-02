const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'ddlfmkbte',
    api_key: '817835976923449',
    api_secret: '2iWmUciTgCjUzv_nur6_T6hqztc'
});

let storageCloud = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'webmad0719', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});

const uploadCloud = multer({ storage: storageCloud });

module.exports = uploadCloud;