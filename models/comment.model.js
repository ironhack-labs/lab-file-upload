const { Schema, model, ObjectId } = require('mongoose');
require('./User.model');
require('./Post.model');

const commentSchema = new Schema(
  {
    content: {
      type: String
    },
    authorId: { 
      type: ObjectId,
      ref: 'User'
    },
    postId: {
      type: ObjectId,
      ref: 'Post'
    },
    imagePath: {
      type: String
    },
    imageName: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true } 
  }
);





module.exports = model('Comment', commentSchema);