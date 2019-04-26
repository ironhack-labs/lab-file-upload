const mongoose = require('mongoose')
const PLM = require('passport-local-mongoose')
const { Schema } = mongoose

const userSchema = new Schema ({
  email: String,
  photoURL: String
}, 
{
  timestamps: true,
  versionKey: false
})

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)