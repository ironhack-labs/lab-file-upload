const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const PictureSchema = Schema({
  path:    String,
  originalName: String
}, {
  timestamps:{ createdAt: 'createdAT', updatedAt:'updatedAt'}
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;
