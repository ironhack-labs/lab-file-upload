const Post = require('../models/Post.model');
const User = require('../models/User.model');

exports.addPost = (req, res) => {
    res.render('post/newPost');
}
exports.getPosts = async(req, res) => {
    const posts = await Post.find();
    res.render('post/posts', {
        posts
    })
}
exports.postPost = async(req, res) => {
    const {
        picName,
        content
    } = req.body
    const {
        path: picPath
    } = req.file
    await Post.create({
        content,
        picName,
        picPath,
        creatorId: req.session.currentUser._id
    })
    res.redirect('/posts')
}
exports.getPost = async(req, res) => {
    const post = await Post.findOne({
            _id: req.params.postId
        })
        .populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'authorId',
                model: 'User'
            }
        })
    const comments = post.comments.reverse()
    let user;
    if (req.session.currentUser) user = await User.findById(req.session.currentUser._id)
    res.render('post/post', {
        post,
        comments,
        user
    })
}