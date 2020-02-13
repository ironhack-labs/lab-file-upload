const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require("../models/User.model")

// Multer setup
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })



router.post('/upload-local', upload.single('phototoupload'), (req, res, next) => {
    console.log('Esto es lo que hace Multer: ', req.user)

    const path = `/uploads/${req.file.filename}`

    User.findByIdAndUpdate(req.user._id, { path })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log("error al subir la foto", err))

    // Picture.create({
    //     description: req.body.description,
    //     path: `/uploads/${req.file.filename}`,
    //     name: req.file.originalname
    // })
})



module.exports = router

