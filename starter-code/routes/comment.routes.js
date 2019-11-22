const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const Post = require('../models/post.model')
const multer = require('multer')
const Comment = require('../models/comment.model')
const uploadCloud = require('../configs/cloudinary.config');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');


// Nuevo Post: renderizar formulario
router.get('/new/:id', ensureLoggedIn('/posts'), (req, res) => {
    const coasterId = req.params.id
    Comment.find(coasterId)
        .populate('post')
        .then(theComment => res.render('comments/newComment', {
            comment: theComment
        }))
})

// Nuevo Post enviar formulario
// router.post('/new', uploadCloud.single('imagePath'), (req, res) => {
//     const imagePath = req.file.url
//     //const picName = req.file.originalname
//     const {
//         content,
//     } = req.body

//     Comment.create({
//             content,
//             creatorId: req.user._id,
//             imagePath, 
//             postId: 
//         })
//         .then(x => res.redirect('/posts'))
//         .catch(err => 'error: ' + err)
// })


module.exports = router;
