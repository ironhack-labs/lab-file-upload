const {Schema, model} = require('mongoose');

const postSchema = new Schema({
  content: {
    type: String
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  picPacth: String,
  picName: String
},
{
  timestamps: true
});

module.exports = model('Post', postSchema);