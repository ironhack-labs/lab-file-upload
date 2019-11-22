 const express = require('express');
 const router = express.Router();

 const Book = require('../models/post.model')





 // Lista de Posts
 router.get('/', (req, res) => {
     Post.find()
         .then(allThePosts => res.render('posts/postsList', {
             posts: allThePosts
         }))
         .catch(err => console.log("Error consultando la BBDD: ", err))
 });


 // Detalles de Post
 router.get('/details/:id', (req, res) => {
     const postId = req.params.id
     Post.findById(postId)
         .then(thePost => res.render('posts/postDetails', {
             post: thePost
         }))
         .catch(err => console.log("Error consultando la BBDD: ", err))
 });


 // Nuevo libro: renderizar formulario
 router.get('/add', (req, res) => res.render('posts/newPost'))

 // Nuevo libro: enviar formulario
 router.post('/add', (req, res) => {


     const { content, creatorId, picPath, picName } = req.body;

     Post.create({
       content,
       creatorId,
       picPath,
       picName
     })
       .then(x => res.redirect("/posts"))
       .catch(err => "error: " + err);
 })





 // Editar libro: renderizar formulario
 router.get('/edit', (req, res) => {
     const postId = req.query.postId
     Post.findById(postId)
         .then(thePost => res.render('posts/editPost', thePost))
         .catch(err => console.log('error!!', err))
 })


 // Editar libro: enviar formulario
 router.post('/edit', (req, res) => {
     const {title, author, description, rating } = req.body
     const postId = req.query.postId


     Post.findByIdAndUpdate(postId, { title,
        author,
             description,
             rating
         })
         .then(res.redirect('/posts'))
         .catch(err => console.log('error!!', err))

 })




 module.exports = router;