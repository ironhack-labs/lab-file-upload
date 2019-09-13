const express = require('express');
const router  = express.Router();

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_API_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// }); 

// const storage = cloudinaryStorage({
//   cloudinary,
//   folder: '/irongram-lab',
//   allowedFormats: ['jpg', 'png']
// });

// const upload = multer({ storage });




module.exports = router;
