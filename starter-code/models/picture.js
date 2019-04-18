const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PictureSchema = Schema({
  name: String,
  path: String,
  originalName: String
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;
