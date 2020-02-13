const express = require('express')
const router = express.Router()
const User = require('../models/User.model')


// Multer setup
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })


// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')







// router.get('/upload-local', (req, res) => res.render('file-form-local'))
// router.post('/upload-local', upload.single('phototoupload'), (req, res, next) => {

//     console.log('Esto es lo que hace Multer: ', req.file)

//     Picture.create({
//         description: req.body.description,
//         path: `/uploads/${req.file.filename}`,
//         name: req.file.originalname
//     })
//         .then(() => res.redirect('/files/gallery'))
//         .catch(err => next(err))
// })

















module.exports = router