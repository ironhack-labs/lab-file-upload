const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  userImg:{
    type: String,
    default: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);