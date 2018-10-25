const mongoose = require(`mongoose`),
      Schema   = mongoose.Schema,

postSchema = new Schema({
  content: String,
  creatorId: {
    type:     Schema.Types.ObjectId,
    ref:      `User`
  },
  picPath: String,
  picName: String
},{
  timestamps: {
    createdAt: `created_at`,
    updatedAt: `updated_at`
  }
});

module.exports = mongoose.model(`Post`, postSchema);