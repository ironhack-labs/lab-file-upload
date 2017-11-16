const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: Object,
    pic_path: String,
    pic_name: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

const ProfileImage = mongoose.model('Profile', profileSchema);
module.exports = ProfileImage;
