const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const PLM = requiere('passport-local-mongoose') 
//passport local moongoose es para loggearte seguro y guardar la info en la DB?

const UserSchema = Schema({
  username: String,
  email:    String,
  password: String,
  photoUrl: String
});

UserSchema.plugin(PLM) //solo quiero PLM para mi foto, necesito poner esto? -->> { usernameField: 'email' } o solo es para especificar concretamente que quiero que el loggin sea con mail?

const User = mongoose.model('User', UserSchema);

module.exports = User;
