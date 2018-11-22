const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PhotoSchema = Schema({
    name: String,
    path:    String,
    originalname: String
  });
  
  const Photo = mongoose.model('Photo', PhotoSchema);
  
  module.exports = Photo;
  