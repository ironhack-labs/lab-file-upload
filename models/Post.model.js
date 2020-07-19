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
      type: String,
      required: [true, 'Image name is required.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Post', postSchema);
