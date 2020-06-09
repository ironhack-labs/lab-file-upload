const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');

const mongoose = require('mongoose');

const routeGuard = require('../configs/route-guard.config');

router.get("/postdetails", (req, res) => {
    let objectId = req.query.id
    Post.findById(objectId)
    .populate('creator')
    .populate('comments.authorId')
        .then((post) => {
            res.render("post/post-details", {post: post});
        })
      .catch((err) => {
        console.log("Err",err)
      })
})

module.exports = router;