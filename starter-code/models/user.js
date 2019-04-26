const mongoose = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email:    String,
  profilePhotoUrl: String,
},
{
  timestamps:true,
  versionKey:false
}
)

userSchema.plugin(PLM, { usernameField: 'email' })
const User = mongoose.model('User', userSchema);