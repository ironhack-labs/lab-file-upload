const { Schema, model } = require('mongoose');
require('./User.model');
require('./Post.model')

const commentSchema = new Schema(
  {
    content: {
      type: String
    },
    authorId: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
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