const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  picPath:    String,
  picName: String
});

module.exports=require("mongoose").model("Post",postSchema)