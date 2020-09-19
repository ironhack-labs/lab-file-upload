const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => "posts", 
    allowFormats: ['png', 'jpg'],
    public_id: (req, file) => 'posts'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
})

const uploadCloud = multer({ storage})

module.exports = uploadCloud