const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

//reading the cloudinary values from the .env file
cloudinary.config({
    cloud_name: "dmthchgtr",
    api_key: "671234521988863",
    api_secret: "SHbJx_4LDJRiGyvXLmzc9qonuew"
});


//cloudinaryStorage config. please see its API via https://www.npmjs.com/package/multer-storage-cloudinary
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'uploads', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    //remember you can create your custom filename pattern
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;