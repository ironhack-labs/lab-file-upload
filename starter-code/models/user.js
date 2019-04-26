const mongoose = require('mongoose');
const PLM = require('passport-local-mongoose')

const userSchema   =  new mongoose.Schema (
  {
  username: String,
  email:    String,
  password: String,
  photoURL: String  
},
{
  timestamps: true,
    versionKey: false
}
)



userSchema.plugin(PLM, { usernameField: 'email' })
module.exports = mongoose.model('User', userSchema)

