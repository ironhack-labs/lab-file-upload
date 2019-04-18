const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ComentSchema = Schema({
    name: String,
    path: String,
    originalName: String,
    creatorId: String,
    comments: Array
});

const Coment = mongoose.model('Coment', ComentSchema);

module.exports = Coment;
