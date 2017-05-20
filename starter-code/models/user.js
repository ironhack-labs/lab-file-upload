const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const Picture = require("./picture");


const userSchema = Schema({
    username: String,
    email:    String,
    password: String,
    picture: Object
});

const User = mongoose.model('User', userSchema);

module.exports = User;
