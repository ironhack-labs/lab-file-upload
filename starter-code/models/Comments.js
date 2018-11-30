const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = Schema({
   content: String,
   authorId: [{
       type: Schema.Types.ObjectId,
       ref: 'Post'
   }],
   imagePath: String,
   imageName: String,
});

const Comments = mongoose.model('Comment', CommentSchema);

module.exports = Comments;