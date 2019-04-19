const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get("/post/new", (req, res) => {
    res.render("/post/new");
});

router.post("/post/new", upload.single("photo"), (req, res) => {
    const content = req.body.content;
    const creatorId = req.body.creatorId;
    const picPath = req.body.picPath;
    const picName = req.body.picName;

    Post.create({
        content: content,
        creatorId: creatorId,
        picPath: picPath,
        picName: picName
    })
        .then(() => res.redirect("/post/new"))
        .catch(() => res.render("/post/new"));
});

module.exports = router;