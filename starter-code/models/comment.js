const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
  content: {type:String},
  authorId:{type: Schema.Types.ObjectId, ref: 'User'},
  ImagePath: String,
  Imagename:{type:String}
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });
  

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;