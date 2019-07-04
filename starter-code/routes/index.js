const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/* GET home page. */
router.get("/", async (req, res, next) => {
	const posts = await Post.find();

	res.render("index", { title: "Express - Generated with IronGenerator", posts });
});

module.exports = router;
