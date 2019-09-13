const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const FormSchema = Schema({
  postText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  creatorID: {
    type: String,
    required: true,
  },
  picPath: {
    type: String,
    required: true,
  },
  picName: {
    type: String,
    required: true,
  }
});

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;
