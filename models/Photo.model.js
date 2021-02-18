const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    name: String,
    path: String,
    originalName: String
}, { timestamps: true });

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;