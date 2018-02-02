const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Post need a name'],
    unique: true
  },  
  pic_path: {
    type: String,
    required: [true, 'Post need a path']
  }, 
  pic_name: {
    type: String,
    required: [true, 'Post need a pic_name']
  }, 
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `That user got already a photo`],
    unique:true
  }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post;