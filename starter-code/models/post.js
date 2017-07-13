
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: { type: String},
  creatorId: { type: Schema.Types.ObjectId },
  picPath: { type: String },
  picName: { type: String },
},{
   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
 });

module.exports = mongoose.model('Post', PostSchema);
