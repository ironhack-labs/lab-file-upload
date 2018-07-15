const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema ({
  content: String,
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  imagePath: String,
  imageName: String
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const postSchema = new Schema({
  content: String,
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  picPath: String,
  picName: String,
  comments: [comment]
},{timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;