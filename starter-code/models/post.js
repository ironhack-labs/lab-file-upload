const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// poner ref: "User" es muy recomendable para saber de que esquema estamos cogiendo el ObjectId
// ref: "Comment" debe coincidir con la coleccion del modelo
const postSchema = mongoose.Schema({
	content: String,
	creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
	comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],
	picPath: String,
	picName: String
});

module.exports = mongoose.model('Post', postSchema);
// entre parentesis de model va el nombre de la colección (en la coleccion aparece en minusculas y plural)
