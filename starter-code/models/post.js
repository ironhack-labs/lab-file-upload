const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//import commentSchema from './commen';
//const commentSchema = require('mongoose').model('commen').schema;
var commentSchema = require('./commen');
/* const commentSchema = new Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  imagePath: String,
  imageName: String
}); */

const postSchema = new Schema(
  {
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    picPath: String,
    picName: String,
    comments: [commentSchema.schema]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);



const Post = mongoose.model("Post", postSchema);

module.exports = Post;
