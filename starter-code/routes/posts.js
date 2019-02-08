//este archivo lo creamos porque que ya no vamos a hacer nada de authentification

const express = require('express');
const router = express.Router();
const postModel = require('../models/post');
const cloudinary = require('../options/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const commentModel = require('../models/comment');

//en .find({}, {_id:0}) => estoy buscando todos los objetos de mi colleccion y le digo que no muestre el id
router.get('/', (req, res, next) => {
	postModel
		.find({})
		// la propiedad de Post comments:
		.populate('comments')
		.then((posts) => res.render('posts/list-post', { posts }))
		.catch((err) => console.log('AN error ocurred finding post', err));
});

//realmente es /posts/add pero como he referenciado /posts como raiz no hace falta
// de hecho debe coincidir con el action del FORM
router.get('/add', ensureLoggedIn('/login'), (req, res, next) => {
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

router.post('/add-comment/:id', cloudinary.single('photo'), (req, res, next) => {
	const newComment = new commentModel({
		content: req.body.content,
		authorId: req.user._id,
		imagePath: req.file.secure_url,
		iamge: req.file.originalname
	});
	newComment
		.save()
		//ME DEVUELVE EL ID DEL COMENTARIO QUE SE ACABA DE GENERAR Y GUARDAR
		.then((comment) => {
			postModel
				.findByIdAndUpdate(req.params.id, {
					//LENGUAJE MONGO...INSERTAMOS EL ID DEL COMENTARIO EN EL ARRAY DEL POST Y ACTUALIZANDO EL POST CON ESA INFO
					$push: { comments: comment._id }
				})
				.then(() => console.log('A comment was saved succesfully'))
				.catch((err) => console.log('An error ocurred refering a comment', err));
		})
		.catch((err) => console.log('An error ocurred saving a comment in db', err));
});

module.exports = router;
