const CommentModel = require("../models/Comment.model");
const PostModel = require("../models/Post.model");

module.exports = {
  listPosts(_req, res) {
    PostModel.find()
      .then(posts => {
        res.render('posts/index', { posts });
      });

  },

  createForm(_req, res) {
    res.render('posts/create');
  },

  createPost(req, res) {
    const { content, picName } = req.body;
    let picPath;
    if (req.file) {
      picPath = req.file.path;
    } else { // Default user pic
      picPath = 'https://www.flaticon.com/svg/static/icons/svg/1380/1380641.svg';
    }

    if (!content || !picName) {
      res.render('posts/create', { errorMessage: 'All fields are mandatory. Please provide a content and picture name.' });
      return;
    }

    PostModel.create({
      content,
      picName,
      picPath,
      creatorId: req.session.currentUser._id,
    });

    return res.redirect('/posts');
  },

  postDetail(req, res) {
    const { idPost } = req.params;
    CommentModel.find({ postId: idPost })
      .then(comments => {
        PostModel.findById(idPost)
          .then(post => res.render('posts/details', { post, comments, errorMessage: req.errorMessage }))
          .catch(() => res.redirect('/posts'));
      })

  }
};