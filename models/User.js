const {model, Schema} = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = Schema({
  username: String,
  email:    String,
  imgURL: String
});

userSchema.plugin(PLM, {usernameField: 'username'})

module.exports = model('User', userSchema)
