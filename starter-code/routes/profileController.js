const express = require('express')
const bcrypt = require('bcrypt')
const multer = require('multer')
const User = require('../models/user')
const profileController = express.Router();
const bcryptSalt = 10;
const upload = multer({dest: './public/uploads'})

 profileController.get('/:id', (req, res, next) => {
    const profileId = req.params.id;
    console.log(profileId)

    User.findById(profileId, (err, user) => {
        if (err) {
            return next(err)
        } 
        res.render('profile/show', {  user: req.user })
    })
 })

 profileController.get('/:id/edit', (req, res, next) => {
     const profileId = req.params.id

         User.findById(profileId, (err, user) => {
             if (err) {
                 return next(err)
             }
             res.render('profile/edit', {
                 user
             })
         })
 })

 profileController.post('/:id/edit',  upload.single("photo"),
 (req, res, next) => {
      const userId = req.params.id
 
     const update = {
         username: req.body.username,
         email: req.body.email,
         password: req.body.password,
         imgPath: `/uploads/${req.file.filename}`,
         imgName: req.file.originalname
     }
     User.findByIdAndUpdate(userId, update, (err, user) => {
         if (err) {
             return next(err)
            }
         res.render('profile/show', { user })
     })
 })

module.exports = profileController