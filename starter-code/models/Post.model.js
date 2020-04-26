const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  picName: String,
  picPath: String,
  comment: {
    content: String,
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    imagePath: String,
    imageName: String,
  }
});


module.exports = model('Post', PostSchema);