const Post = require("../models/Post")

exports.postingView = (req, res) => {
    res.render("posting")
}

exports.createPost = async(req, res) => {
    const { content, picName } = req.body
    const { path } = req.file
    await Post.create({
        content,
        picName,
        picUrl: path
    })
    res.redirect("/")
}