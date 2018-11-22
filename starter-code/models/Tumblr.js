const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TumblrSchema = Schema({
    content: String,
    creatorID: Object,
    picPath: String,
    picName: String,
});

const Tumblr = mongoose.model('User', TumblrSchema);

module.exports = User;
