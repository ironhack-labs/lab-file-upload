const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.CLOUDINARYKEY,
  api_secret: process.env.CLOUDINARYSECRET
})

let storage = cloudinaryStorage({
  cloudinary,
  folder: 'irontumblr',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) =>{
    cb(null, file.originalname);
  }
})

module.exports = multer({storage})