const multer            = require(`multer`),
      cloudinary        = require(`cloudinary`),
      cloudinaryStorage = require(`multer-storage-cloudinary`);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder:         `Tumblr`,
  allowedFormats: [`jpg`, `jpeg`, `png`, `gif`]
});

module.exports = multer({storage});