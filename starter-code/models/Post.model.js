const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: String,
    content: String,
    photoURL: String,
    author: {
     type: Object.Type.Schema, 
     ref: "User"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("Post", postSchema);
