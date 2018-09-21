const express = require("express");
const router = express.Router();
const multer = require("multer");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const upload = multer({ dest: "./public/uploads/" });
const Commen = require("../models/commen");
const Post = require("../models/post");

//INDEX
router.get('/', (req, res, next) => {
    console.log("ENTRA GET");
    Post.find().populate('creatorId').then(posts => {
        console.log(posts);
        res.render('index', {posts});
    }).catch(e => console.log(e))
})

module.exports = router;
