const { post } = require("../app")
const Post = require('../models/Post')
const mongoose = require('mongoose')

exports.postFormView = (req, res) => {
    const user = req.session.currentUser
    res.render('posts/form', { user })
}

exports.postFormSend = async(req, res) => {
    const { creatorId, picName, content } = req.body
    await Post.create({ content, creatorId, picPath: req.file.path, picName })
    res.redirect('/posts')
}

exports.postsView = async(req, res) => {
    const posts = await Post.find()
    res.render('posts/posts', { posts })

}

exports.postDetails = async(req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    console.log(post)
    res.render('posts/details', { post })

}