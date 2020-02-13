const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const picSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Picture', picSchema);
