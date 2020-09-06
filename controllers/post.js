const Post = require("../models/Post")
const Comment = require("../models/Comments")

exports.postingView = (req, res) => {
    res.render("posting")
}

exports.createPost = async(req, res) => {
    const { content, picName } = req.body
    const { path } = req.file
    const post = await Post.create({
        content,
        picName,
        picUrl: path
    })

    //console.log(post)


    res.redirect("/")
}

exports.postsView = async(req, res) => {
    const posts = await Post.find()
    console.log(posts)
    res.render("index", { posts })
}

exports.getPost = async(req, res) => {
    //console.log(req.params.postId)
    const post = await Post.findById(req.params.postId).populate('creatorId')
        .populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'authorId',
                model: 'User'
            }
        });
    console.log(post)
    res.render("postDetail", { post })
}

exports.makeComment = async(req, res) => {
    const { content } = req.body
    const commentPost = req.params.postId;
    const comment = await Comment.create({
        content,
        authorId: req.session.currentUser._id
    })
    await Post.findByIdAndUpdate(commentPost, { $push: { comments: comment } }, { new: true });
    res.redirect('/posts/' + req.params.postId)
}