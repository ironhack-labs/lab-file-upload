/* jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: String,
    email: String,
    password: String,
    profilePic: {
        picPath: {
            type: String,
            default: "https://365randommuppets.files.wordpress.com/2014/09/266-beaker1.jpg?w=1200"
        },
        picName: {
            type: String,
            default: "Profile Picture"
        }
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
