const Post = require('../models/Post');

exports.getAddView = (req, res) => {
  res.render('posts/add');
};

exports.postAddView = async (req, res, next) => {
  const { picName, content, picture} = req.body;

  if (!picName || !content || !req.file) {
    res.render('posts/add', { errorMessage: 'Todos los Campos son necesarios.' });
    return;
  }

  let post = await Post.create({
    creatorId: req.session.currentUser._id,
    picName,
    content,
    picPath: req.file.path
  });

  res.redirect('/');
};


exports.getDetailView = async (req, res, next) => {
  const post = await Post
  .findById(req.params.postId)
  .populate("creatorId")
  .populate({
    path: 'userComments',
    populate: {
      path: 'authorId',
      populate: {
        path: '_id',
        model: 'User'
      } 
    } 
  });

  res.render('posts/detail', post);
};