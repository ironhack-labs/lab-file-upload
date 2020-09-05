const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    return {
      folder: "tumblerLikeApp",
      allowed_formats: ["jpg", "png"],
      public_id: `app-${file.originalname}`
    }
  }
})

module.exports = multer({ storage })