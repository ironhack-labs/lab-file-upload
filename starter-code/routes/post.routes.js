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
	const { id } = req.params
	const post = await Post.findById(id)
	res.render('posts/single', {post, test})
})

router.post('/comments/:id', ensureLoggedIn("/login"), upload.single("photo"), async (req, res) => {
	const { id } = req.params
	const { content } = req.body
	if (req.file) {
	const { filename, originalname } = req.file
		try {
			await Post.findByIdAndUpdate(id,
				{
					$push: {
						comments: {
							"content": content,
							"authorId": req.user._id,
							"imagePath": `/uploads/${filename}`,
							"imageName": originalname
						}
					}
				})
		}
		catch (error) {
			console.log(error)
		}
	} else {
		try {
			await Post.findByIdAndUpdate(id,
				{
					$push: {
						comments: {
							"content": content,
							"authorId": req.user._id,
						}
					}
				})
		}
		catch (error) {
			console.log(error)
		}
	}
	res.redirect(`/post/${id}`)
})

module.exports = router;
