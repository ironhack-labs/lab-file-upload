const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    profilePic: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;