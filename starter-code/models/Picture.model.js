const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const picSchema = new Schema(
  {
    pictureName: String,
    imageUrl: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Picture', picSchema);
