const Post = require('../models/Post.model')
const Comment = require('../models/Comment.model')

exports.addComment = async(req, res) => {
    const authorId = req.session.currentUser._id
    const {
        content,
        imageName
    } = req.body
    const file = req.file
    let imagePath;
    if (file) imagePath = file.path
    const comment = await Comment.create({
        content,
        authorId,
        imageName,
        imagePath
    })
    await Post.findByIdAndUpdate(req.params.postId, {
        $push: {
            comments: comment._id
        }
    })
    res.redirect(`/posts/${req.params.postId}`)
}