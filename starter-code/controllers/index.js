const User = require('../models/user')
const Post = require('../models/Posts')

exports.profileView = async (req, res, next) => {
    const {username, email, _id} = req.user
    const user = await User.findById(_id)
    const posts = await Post.find({creatorId: _id})
    res.render('profile', {posts, user})
}

exports.editView = async (req, res, next) => {
    const {_id} = req.user
    const user = await User.findById(_id)
    res.render('edit-image', user)
}

exports.uploadImage = async(req, res, next) => {
    const { _id } = req.user
    const { secure_url: photoURL } = req.file
    const user = await User.findByIdAndUpdate(_id, { photoURL }, { new: true })
    req.user = user
    res.redirect('/profile')
}

//Para hacer posts
exports.createPostView = (req, res, next) => {
    res.render('create-post')
}

exports.createPost = async (req, res, next) => {
    const { imageName, postTitle, postContent } = req.body
    const { secure_url: postImage } = req.file
    const { _id } = req.user
    await Post.create({title: postTitle, content: postContent, creatorId: _id, photo: postImage, picName: imageName })
    const posts = await Post.find({creatorId: _id})
    res.send(posts)
    // res.redirect('/profile')
}