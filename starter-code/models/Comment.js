const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheComment = new Schema({
  content: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePath: String,
  imageName: String
}, {
  timestamps: true
});


module.exports = mongoose.model("Comment", scheComment);