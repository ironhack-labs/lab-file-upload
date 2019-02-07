//este archivo lo creamos porque que ya no vamos a hacer nada de authentification

const express = require('express');
const router = express.Router();
const postModel = require('../models/post');
const cloudinary = require('../options/cloudinary');

//en .find({}, {_id:0}) => estoy buscando todos los objetos de mi colleccion y le digo que no muestre el id
router.get('/', (req, res, next) => {
	postModel
		.find({}, { _id: 0 })
		.then((posts) => res.render('posts/list-post', { posts }))
		.catch((err) => console.log('AN error ocurred finding post', err));
});

//realmente es /posts/add pero como he referenciado /posts como raiz no hace falta
// de hecho debe coincidir con el action del FORM
router.get('/add', (req, res, next) => {
	res.render('posts/add-post');
});

//el middleware cloudinary.single("photo") es por el multipart del formulario, para que recoja bien la información partida en muchos casos
router.post('/add', cloudinary.single('photo'), (req, res, next) => {
	const newPost = new postModel({
		// hacemos console.log(req.body) para ver todos los datos que nos estan dando
		content: req.body.content,
		creatorId: req.user._id,
		picPath: req.file.secure_url,
		picName: req.file.originalname
	});

	newPost.save().then(() => res.redirect('/posts/')).catch((err) => console.log('An error ocurred saving', err));
});

module.exports = router;
