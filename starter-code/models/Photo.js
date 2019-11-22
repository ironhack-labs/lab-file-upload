const {
  model,
  Schema
} = require("mongoose");

const photoSchema = new Schema({
  imgName: String,
  imgPath: String
}, {
  timestamps: true
});


module.exports = model("Photo", photoSchema);