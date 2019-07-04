const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email: String,
  password: String,
  imgName: String,
  imgPath: {
    type: String,
    default:
      "https://kinseyinstitute.org/img/profiles/default-profile-image.jpg"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
