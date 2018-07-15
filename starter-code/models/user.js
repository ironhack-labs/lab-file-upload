const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = Schema({
  name: String,
  path: String,
  originalName: String
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  photoSchema
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
