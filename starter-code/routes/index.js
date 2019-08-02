const express = require('express');
const router = express.Router();
const multer = require('multer')

const Post = require("../models/post.model")

const uploadCloud = require('../configs/cloudinary.config')

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('index', { posts })
    })

})

router.post('/new-post', (req, res, next) => {

  const title = req.body.title


  Post.create({ title })
    .then(() => res.redirect('/'))
    .catch(err => console.log('Hubo un error:', err))
})

module.exports = router;


// llamar a la url del action en la ruta del index  router.post('/new-post') 
// cambiar input form name = tittle 

// req recibe url 
// res  repsose

//en req.body estara el formulario  -> req.body.title = input (el post) 

// crear coleccion en mongoos para los posts || crear modelo -> requiere('ruta MODELO POST')

// ruta || metger cloudinary
// post.create({title: req.body.title})
//.then(post => {
//res.redirect('/')
//})

//modificar este render
//Post.find()
//.then (posts => {
//res.resnder('index', {posts})
//})