const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  photoName:String,
  photoURL:{
    type:String,
    default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-icon%2Fbottomprofile_849431&psig=AOvVaw3I4RvUTr_pk3CwMfSwai5K&ust=1581143604328000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLi1-o_pvucCFQAAAAAdAAAAABAF"
  }
});

module.exports =mongoose.model('User', UserSchema);


