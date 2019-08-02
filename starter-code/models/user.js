const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  imgName: String,       //IMPORTANTE NO OLVIDARSE DE ESTAS PROPIEDADES
  imgPath: String,       //Son imprescindibles para subir la image

}, {timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

