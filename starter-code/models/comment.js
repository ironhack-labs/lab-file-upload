const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = Schema({
  content: String,
  authorId: {
    Type:Schema.Types.ObjectId,
    ref:'post'
  },
  imagePath: String,
  imageName: String,
})

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
