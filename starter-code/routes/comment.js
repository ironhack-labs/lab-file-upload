const express = require('express');
 const router  = express.Router();
 var multer  = require('multer');
 const Comment = require('../models/Comment');
 var upload = multer({ dest: './public/uploads/' });
 
 
 router.get('/', (req, res) => {
   res.render('comment', {user:req.user});
 });
 
 router.get('/show', (req,res) => {
   Comment.find({}, (err, com) => {
     res.render('show', {user:req.user, com});
   })
 });
 
 router.post('/:id', upload.single('photo'), function(req, res){
 
   const comment = new Comment({
     content: req.body.content,
     pic_path: `/uploads/${req.file.filename}`,
     pic_name: req.file.originalname,
     creatorId: req.params.id,
   });
 
   comment.save((err) => {
       res.redirect('/');
   });
 });
 
 module.exports = router;