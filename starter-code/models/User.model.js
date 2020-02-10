const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  photoURL: {
    type: String,
    default:
      'https://pngimage.net/wp-content/uploads/2018/06/icono-perfil-png-8.png'
  },

});

module.exports = model('User', UserSchema);
