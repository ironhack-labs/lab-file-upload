const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model');
const mongoose = require('mongoose');
const path = require('path');

// Requerimos el archivo de configuracion de Cloudinary...
const fileUploader = require('../configs/cloudinary.config');

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

//////////////
// Ruteo para Post
//////////////

router.get('/post_form', (req, res) => res.render('./post/post_form'));

router.post('/post_form', fileUploader.single('image'), (req, res) => {
    const { content, image } = req.body


    //Comprobamos que content no este vacio


    // Vamos a crear el post
    Post.create({ content, picName: image })
        .then(x => {
            console.log("Se actualizo la BBDD", x)
        })
        .catch(err => {
            console.log("Error en la base de datos", err)
        })

    // redirigir para un nuevo post
    res.redirect('/post_form')

});


router.get('/ver_post', (req, res) => {
    Post.find()
        .then(allPostsFromDB => {
            res.render('../views/post/ver_posts.hbs', { post: allPostsFromDB })
        })
        .catch(error => console.log('Error en la base de datos : ', error))
});


router.get('/detalle_post/:post_id', (req, res) => {
    const { post_id } = req.params;
    console.log(post_id)

    Post.findById(post_id)
        .then(thePost => res.render('../views/post/ver_post-detalle.hbs', thePost))
        .catch(error => console.log('Error buscando el Post seleccionado', error))

});


module.exports = router;