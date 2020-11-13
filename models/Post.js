const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    content: String, 
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    picPath: String,
    picName: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }]
    },
  {
    timestamps: true
  }
);

module.exports = model('Post', userSchema);
