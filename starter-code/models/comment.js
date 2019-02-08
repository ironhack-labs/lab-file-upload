const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// poner ref: "User" es muy recomendable para saber de que esquema estamos cogiendo el ObjectId
const commentSchema = mongoose.Schema({
	content: String,
	authorId: { type: Schema.Types.ObjectId, ref: 'User' },
	imagePath: String,
	imageName: String
});

module.exports = mongoose.model('Comment', commentSchema);
