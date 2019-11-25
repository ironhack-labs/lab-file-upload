const {
  model,
  Schema
} = require("mongoose");

const photoPost = new Schema({
  content: String,
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  picName: String,
  picPath: String
}, {
  timestamps: true
});


module.exports = model("Photo", photoPost);