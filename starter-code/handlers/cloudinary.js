const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary')
const uploadCLoud = require('../handlers/cloudinary')

cloudinary.config({
  cloudname: process.env.CLOUD_NAME,
  APIkey: process.env.API_KEY,
  APIsecret:process.env.API_SECRET
})

const storage= cloudinaryStorage({
  cloudinary: cloudinary,
  folder:"Tumblr",
  allowedFormats: ["jpg","png"],
  filname: function (req, file,cb){
    cb(null,file.originalname)
  }
})

const uploadCloud = multer({storage})

module.exports = uploadCloud;