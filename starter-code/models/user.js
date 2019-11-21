const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  photoName: {
    type: String,
    defaul: "hola"
  },
  photoUrl: {
    type: String,
    default: "adios"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
