const {model, Schema} = require('mongoose');
const PLM = require('passport-local-mongoose')

const userSchema = new Schema({
  username: String,
  email:    String,
  password: String,
  photoURL: String
},{
  timestamps: true,
  versionKey: false
}
);

userSchema.plugin(PLM, {usernameField: 'email'})
module.exports =  model('User', userSchema);