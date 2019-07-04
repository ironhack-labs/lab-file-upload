const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/create", ensureLoggedIn("/login"), (req, res) => {
	res.render("posts/create");
});

router.post("/create", ensureLoggedIn("/login"), upload.single("photo"), async (req, res) => {
	const { content } = req.body;
	await Post.create({
		content,
		creatorId: req.user.id,
		picPath: `/uploads/${req.file.filename}`,
		picName: req.file.originalname
	});
	res.redirect("/");
});

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const post = await Post.findById(id)

    res.render('posts/single', post)
})

module.exports = router;
