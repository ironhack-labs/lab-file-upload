const {model, Schema} = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    photoUrl: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, {usernameField: 'email'})

module.exports = model('User', userSchema)