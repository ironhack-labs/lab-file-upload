const mongoose = require('mongoose');
// const Schema   = mongoose.Schema;

const cloudinary = require('cloudinary');

const UserSchema = new mongoose.Schema({
  username:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  url:{
    type:String
  },
  path:{
    type:String
  },
  description:{
    type:String
  }
});

// const User = mongoose.model('User', UserSchema);

UserSchema.virtual('resizedUrl').get(function() {
  const image = this;
  const path = image.url.split(`http://res.cloudinary.com/${ process.env.CLOUDINARY_API_NAME }/image/upload/`)[1];
  // console.log(path);
  return cloudinary.url(path, { width: 800 });
});


// module.exports = User;
module.exports = mongoose.model('User', UserSchema);