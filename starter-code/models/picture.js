const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PictureSchema = Schema({
  path: String,
  picName: String
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;
