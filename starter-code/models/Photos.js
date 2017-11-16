const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
  name: {type: String},
  pic_path: {type: String},
  pic_name: {type: String},
},{
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
});

let Img = mongoose.model('imgs', imgSchema);
module.exports = Img;
