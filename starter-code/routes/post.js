//este archivo lo creamos porque que ya no vamos a hacer nada de authentification

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('list-post');
});
