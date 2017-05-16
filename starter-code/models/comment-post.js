const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = Schema({
  content : {type:String},
  authorId : {type:String},
  imagePath : {type:String},
  imageName : {type:String}
});

const Comment = mongoose.model('comment',comment);
module.exports = Comment;
