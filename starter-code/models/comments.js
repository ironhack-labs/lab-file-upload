const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentsSchema = Schema({
    content:String,
    authorId:Schema.Types.ObjectId,
    post:{type: Schema.Types.ObjectId, ref: 'Post'},
    imagePath:String,
    imageName:String
    
  });
  
  const Comments = mongoose.model('Comments', CommentsSchema);
  
  module.exports = Comments;