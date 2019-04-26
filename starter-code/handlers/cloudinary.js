const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CN,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISEC
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'usuarios',
  allowedFormats: ['jpg', 'png'],
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud