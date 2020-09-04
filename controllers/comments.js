const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getAddComment =(req, res, next) => {
  res.render("comments/add", {postId: req.params.postId});
};


exports.postAddComment = async (req, res, next) => {
  
  const { imageName, content} = req.body;

  if (!imageName || !content ) {
    const post = await Post.findById(req.params.postId);
    post.errorMessage = 'All fields are mandatory. Please provide your username, email and password.';
    res.render(`posts/detail`, post);
    return;
  }
  let path = "";
  
  if (req.file)
    path = req.file.path;

  let comment = await Comment.create({
    authorId: req.session.currentUser._id,
    imageName: imageName,
    content: content,
    imagePath: path
  });

  await Post.findByIdAndUpdate(req.params.postId, { $push: { userComments: comment._id } } );

  res.redirect(`/posts/details/${req.params.postId}`);
};