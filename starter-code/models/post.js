const mongoose = require('mongoose');

// poner ref: "User" es muy recomendable para saber de que esquema estamos cogiendo el ObjectId
const postSchema = mongoose.Schema({
	content: String,
	creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
	picPath: String,
	picName: String
});

module.exports = mongoose.model('Post', postSchema);
// entre parentesis de model va el nombre de la colección (en la coleccion aparece en minusculas y plural)

// content - Text belonging to the post
// creatorId - ObjectId of the post's creator
// picPath - Where the picture is stored
// picName - The picture's name
