

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: [true, 'Content is required.'],
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    picPath: {
      type: String,
      default: `https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`
    },
    picName: {
      type: String,
      default: 'Default image'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Post', postSchema);