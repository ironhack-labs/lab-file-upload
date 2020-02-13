const express = require('express')
const passport = require('passport')
const router = express.Router()
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login')

const multer = require('multer')
const upload = multer({
    dest: './public/uploads/'
})
const uploadCloud = require('../configs/cloudinary.config')
const Picture = require('../models/Picture.model')
const User = require('../models/User.model')
const Comment = require('../models/comments.model')



router.get('/posts', (req, res, next) => {
    Picture.find()
        .then(allPictures => res.render('posts/list', {
            allPictures
        }))
        .catch(err => next(new Error(err)))
})

router.get('/posts/:id/details', (req, res, next) => {

    const promiseP = Picture.findById(req.params.id)
    const promiseC = Comment.find({
        postId: req.params.id
    })
    Promise.all([promiseP, promiseC])
        .then(results => {
            console.log(results[1])
            res.render('posts/details', {
                picture: results[0],
                comment: results[1]
            })
        })
        .catch(err => console.log("ha pasado un error", err))
})
router.post('/posts/:id/details', (req, res, next) => {

    Comment.create({
            content: req.body.content,
            authorId: req.user.id,
            postId: req.params.id
        })
        .then(() => res.redirect(`/posts/${req.params.id}/details`))
        .catch(err => console.log('error', err))
})


router.post('/profile/create', uploadCloud.single('phototoupload'), (req, res, next) => {
    Picture.create({
            picName: req.file.originalname,
            content: req.body.content,
            picPath: req.file.secure_url,
            creatorId: req.user.id,
        })
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err)
            next(err)
        })
})

router.post('/profile/profile-img', uploadCloud.single('phototoupload'), (req, res, next) => {
    const profilePicture = {
        name: req.file.originalname,
        path: req.file.secure_url
    }
    User.findByIdAndUpdate(req.user.id, {
            profilePicture
        })
        .then(x => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})


module.exports = router