const { Schema, model } = require('mongoose');
require('./User.model');

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
    }
  },
  {
    timestamps: true
  }
);

postSchema.virtual("user", {
  ref: "User",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

module.exports = model('Post', postSchema);