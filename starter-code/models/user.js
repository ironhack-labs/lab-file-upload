const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: String,
  email:    String,
  password: String,
  imageUrl: {
    type: String, 
    trim: true
  }
  // timestamps: true, 
});

/* const cloudinary = require('cloudinary');

schema.virtual('resizedUrl').get(function() {
  const image = this;
  const path = image.url.split(`http://res.cloudinary.com/${ process.env.CLOUDINARY_API_NAME }/image/upload/`)[1];
  // console.log(path);
  return cloudinary.url(path, { width: 800 });
}); */

const User = mongoose.model('User', UserSchema);

module.exports = User;
