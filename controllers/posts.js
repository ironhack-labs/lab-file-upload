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
  // Get path variable declared
  const imageFile = req.file;
  console.log(imageFile)
  let commentImagePath = "https://i.pinimg.com/originals/eb/53/61/eb5361ca8b4a02e9fdeb511b9dccd5a3.png";
  // Get post to be attached
  const attachedPost = req.params.postId;
  // Get elements from body
  const { imageName, content } = req.body;
  // Checar si nos mandaron imagen
  if (typeof imageFile != 'undefined') {
     commentImagePath = req.file.path
  }
  // Create new comment
  const newComment = await Comment.create({
    imageName,
    imagePath: commentImagePath,
    content,
    authorId: req.session.currentUser._id
  }).catch(err => console.log(err))
  // Push comment to post comments
  await Post.findByIdAndUpdate(attachedPost, { $push: { comments: newComment } }, { new: true });
  // Redirect to same page
  res.redirect(`/posts/${attachedPost}`);
}