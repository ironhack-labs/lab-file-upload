require('dotenv').config();
const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Comment = require('../models/comment.js');
// todas las rutas entran  en /post


router.post('/', uploadCloud.single('photo'),(req, res) => {

const newComment = new Comment({
    content:req.body.content,
    postId: req.body.idPost,
    picPath: req.file.url,
    picName: req.file.originalname,
    authorId: req.user._id
})
   
    newComment.save()
    .then(comment => {
        console.log(comment)
        res.redirect('/post/show');
    })
    .catch(error => {
        console.log(error);
    })
});
 
module.exports = router;