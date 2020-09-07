const Post = require("../models/Post.model")
const User = require("../models/User.model")


//1. the GET route to display the post-form,
exports.addPost = (req, res) => {
  res.render('/post/new');
}
//2. the POST route to actually create the post (this route should include file uploading),
exports.postPost = async(req, res) => {
  const {picName,content} = req.body
  const {path: picPath } = req.file
  await Post.create({ content, picName, picPath, creatorId: req.session.currentUser._id})
  res.redirect('/all')
}
//3. the GET route to display the posts and
exports.showPosts = async(req, res) => {
  const posts = await Post.find();
  res.render('/post/all', { posts })
}
//4. the GET route to display post-details.

exports.getPost = async(req, res) => {
  const post = await Post.findOne({_id: req.params.postId})
      .populate({
          path: 'comments',
          model: 'Comment',
          populate: {
              path: 'authorId',
              model: 'User'
          }
      })


  let user;
  if (req.session.currentUser) user = await User.findById(req.session.currentUser._id)
  res.render('post/post', { post,user})
}


