const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const comentSchema = Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

const Coment = mongoose.model('Coment', comentSchema);

module.exports = Coment;