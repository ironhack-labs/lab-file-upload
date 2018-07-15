const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: {type:String},
  creatorId:{type: Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picname:{type:String}
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;