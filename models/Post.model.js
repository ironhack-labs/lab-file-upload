const { Schema, model } = require('mongoose');
require('./User.model');
require('./comment.model');

const postSchema = new Schema(
  {
    content: {
      type: String
    },
    creatorId: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    },
    comment: [
      {type: Schema.Types.ObjectId,
      ref: 'Comment'}
    ]},
  {
    timestamps: true,
    toJSON: { virtuals: true } 
  }
);

module.exports = model('Post', postSchema);
