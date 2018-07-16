const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
  content: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  picPath: { type: String, required: true },
  picName: { type: String, required: true },
});


module.exports = mongoose.model('Post', PostSchema);
