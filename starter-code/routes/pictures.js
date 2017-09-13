// const Picture = require('../models/picture');
//
// const express = require('express');
// const router = express.Router();
//
// // Route to upload from project base path
// const upload = multer({ dest: './public/uploads/' });
//
// router.post('/upload', upload.single('photo'), function(req, res){
//
//   pic = new Picture({
//     name: req.body.name,
//     pic_path: `/uploads/${req.file.filename}`,
//     pic_name: req.file.originalname
//   });
//
//   pic.save((err) => {
//       res.redirect('/');
//   });
// });
