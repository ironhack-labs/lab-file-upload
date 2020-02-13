const express = require('express')
const router = express.Router()
const Picture = require('../models/Picture.model')
const User = require('../models/User.model')

// Multer setup
const multer = require('multer')
const upload = multer({
    dest: './public/uploads/'
})


// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')



router.get('/gallery-index', (req, res, next) => {
    Picture.find()
        .then(allPictures => res.render('files/gallery-index', {
            allPictures
        }))
        .catch(err => next(err))
})



router.get('/upload-local', (req, res) => res.render('file-form-local'))
router.post('/upload-local', upload.single('phototoupload'), (req, res, next) => {

    console.log('Esto es lo que hace Multer: ', req.file)

    Picture.create({
            name: req.body.name,
            path: `/uploads/${req.file.filename}`,
            originalName: req.file.originalname
        })
        .then(() => res.redirect('/profile'))
        .catch(err => next(err))
})




router.get('/upload-cloud', (req, res) => res.render('file-form-cloud'))
router.post('/upload-cloud', uploadCloud.single('phototoupload'), (req, res, next) => {
    console.log("Y esto es lo que hace multer cuando colabora con Cloudinary", req.file)

    Picture.create({
            name: req.body.name,
            path: req.file.secure_url,
            originalName: req.file.originalname,
            authorId: req.user._id,
        })
        .then((img) => {

            // User.findByIdAndUpdate(req.user._id, {
            //     profileImage: img.path
            // })


            res.redirect('/profile')
        })
        .catch(err => next(err))
})


router.post('/upload-profile', upload.single('phototoupload'), (req, res, next) => {

    console.log('Esto es lo que hace Multer: ', req.file)

    const profile = {
        name: req.file.originalname,
        path: req.file.secure_url
    }
    User.findByIdAndUpdate(req.user.id, {
            profile
        })
        .then(() => res.render('/profile'))
        .catch(err => next(err))
})








module.exports = router