const mongoose = require(`mongoose`),
      Schema   = mongoose.Schema,

commentSchema = new Schema({
  content:   String,
  authorId: {
    type:    Schema.Types.ObjectId,
    ref:     `User`
  },
  imagePath: String,
  imageName: String,
  post: {
    type:    Schema.Types.ObjectId,
    ref:     `Post`
  }
},{
  timestamps: {
    createdAt: `created_at`,
    updatedAt: `updated_at`
  }
});

module.exports = mongoose.model(`Comment`, commentSchema);