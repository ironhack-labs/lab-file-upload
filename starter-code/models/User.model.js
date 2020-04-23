const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    profileImg: String, //This would be the Picture's Path
    profileImgName: String,
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);
