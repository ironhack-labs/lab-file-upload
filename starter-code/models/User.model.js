const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    imgName: String,
    imgPath: String,
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = model('User', UserSchema);
