require('dotenv').config()

const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLN,
  api_key: process.env.CLK,
  api_secret: process.env.CLS
})

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'profile pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
}) 


const uploadCloud = multer({storage})

module.exports = uploadCloud

