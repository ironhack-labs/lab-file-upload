const CommentModel = require("../models/Comment.model");
const PostModel = require("../models/Post.model");

module.exports = {
  async listPosts(_req, res) {
    return await CommentModel.find();
  },

  async createComment(req, res) {
    const { content, imageName, idPost } = req.body;

    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    } else { // Default user pic
      imagePath = '';
    }

    if (!content) {
      const post = await PostModel.findById(idPost);
      req.errorMessage = 'Please, fill the content field.';
      return res.redirect(`/posts/${idPost}`);
    }

    CommentModel.create({
      content,
      imageName,
      imagePath,
      authorId: req.session.currentUser._id,
      postId: idPost
    });

    return res.redirect(`/posts/${idPost}`);
  }
};