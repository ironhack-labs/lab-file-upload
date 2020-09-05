const Post = require('../models/Posts');
const Comment = require('../models/Comment')

exports.viewPostForm = (req, res) => {
  res.render('posts/new')
}

exports.createPost = async (req, res) => {
  // Get all the attributes from de body & param
  const {content, picName} = req.body
  const newPost = await Post.create({
    content,
    picPath: req.file.path,
    picName,
    creatorId: req.session.currentUser._id
  });
  console.log(newPost)
  res.redirect('/')
 }

exports.listPosts = async (req, res, next) => {
  // get all posts
  const allPosts = await Post.find().populate("creatorId")
  res.render('index', {allPosts})
}

exports.postDetails = async (req, res) => {
  // get post id from params to visulize post 
  const postId = req.params.postId
  // find post and render detail view with params
  const selectedPost = await Post.findById(postId).populate('creatorId')
  .populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'authorId',
      model: 'User'
    }
  });
  res.render("posts/show", selectedPost)
}

exports.deletePost = async (req, res) => {
  // get id from params
  const postId = req.params.postId;
  // delete post
  await Post.findByIdAndDelete(postId);
  res.render('/')
}

exports.createComment = async (req, res) => {
  // Get post to be attached
  const attachedPost = req.params.postId
  // Get elements from body
  const { imageName, imagePath, content } = req.body;
  // Create new comment
  const newComment = await Comment.create({
    imageName,
    imagePath,
    content,
    authorid: req.session.currentUser._id
  })
  // Push comment to post comments
  await Post.findByIdAndUpdate(attachedPost, { $push: { newComment } },  {new: true} );
}