const User = require ('../models/User.model')
const Post = require ('../models/Post.model')

exports.createPost = async(req, res) => {
  const { title, description } = req.body;
  await Post.create({ title, description })
  res.redirect('/posts')
}


exports.getAllPosts = async(req, res) => {
    const posts = await Post.find()
    res.render('post-list', { posts })
}

exports.getDetail = async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.render('post-detail', post)
}
