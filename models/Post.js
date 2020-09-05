const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    content: String,
    imageURL: String,
    imagename: String, 
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", postSchema);
