const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email:    String,
  password: String,
  photoURL: Schema.Types.Mixed
});

module.exports=require("mongoose").model("user",userSchema)