const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  content: String,
  creatorId: { type: Schema.ObjectId, ref: "User" },
  picPath: String,
  picName: String
}, 
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = model('Post', postSchema, 'posts');
