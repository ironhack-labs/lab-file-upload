const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  imgName: String,
  imgPath: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfbAGxAhFwWC1FqBA4OEuNVttlb4y8xvN1Lf2uq07HVD9sc1f9"
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
