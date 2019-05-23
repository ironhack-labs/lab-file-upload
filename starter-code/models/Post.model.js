const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId: String,
  picPath: String,
  picName: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  comments: [{
    content: String,
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true
    },
    imagePath: String,
    imageName: String
  }]
}, {
  timestamps: true
});

postSchema.plugin(require('mongoose-autopopulate'))
module.exports = mongoose.model('Post', postSchema);