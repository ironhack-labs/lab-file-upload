const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  profilePicture: {
    picturePath: {
        type: String,
        default: "https://365randommuppets.files.wordpress.com/2014/09/266-beaker1.jpg?w=1200"
      },
      pictureName: {
          type: String,
          default: "Profile Picture"
      }
  }
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;
