const mongoose = require('mongoose')
const PLM = require('passport-local-mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
  email: String,
  photoURL: String,
  status: {
    type: String,
    enum: ['Active','Pending Confirmation'],
    default: 'Pending Confirmation'
  },
  confirmationCode: {
    type: String,
    unique: true
  },
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});
userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)
