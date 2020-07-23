const { Schema, model, Mongoose } = require('mongoose');

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Text is required.']
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    picPath: {
      type: String
    },
    picName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
  justOne: false
})

module.exports = model('Post', postSchema);
