const Post = require('../models/Post')

exports.newView = (_,res) => res.render('posts/new')

exports.newPost = async (req,res,nxt) => {
    const {_id: creatorID} = req.user
    const {secure_url: picPath} = req.file
    const {content, picName} = req.body
    const newPost = {
        creatorID,
        content,
        picPath,
        picName
    }
    const post = await Post.create(newPost)
    res.redirect(`/show/${post._id}`)
}

exports.editView = async (req,res,nxt) => {
    const {id: idPost} = req.params
    const post = await Post.findById({_id: idPost})
    res.render('posts/edit', post)
}

exports.editPost = async (req,res,nxt) => {
    console.log(req.params)
    const {id: creatorID} = req.user
    const {id: idPost} = req.params
    const {content, picName} = req.body
    const {secure_url: picPath} = req.file
    const post = await Post.findByIdAndUpdate(
        {_id: idPost}, 
        {content,picPath,picName,creatorID},
        {new: true}
        )
    res.redirect(`/show/${idPost}`)
}

exports.detailView = async (req,res,nxt) => {
    const {id: idPost} = req.params
    const post = await Post.findById({_id: idPost})
    res.render('posts/detail', post)
}
