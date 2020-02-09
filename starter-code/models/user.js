const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoName: String,
  photoURL: {
    type: String,
    default: 'https://images.vexels.com/media/users/3/137047/isolated/preview/5831a17a290077c646a48c4db78a81bb-perfil-de-usuario-icono-azul-by-vexels.png'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
