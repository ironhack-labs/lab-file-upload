const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
  {
    content: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = model('Comment', commentSchema);
