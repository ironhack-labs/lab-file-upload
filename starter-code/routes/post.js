const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploader = require('../helpers/multer');
const User = require('../models/user'); 
const Post = require('../models/Post');

// Route to view all the posts, in place of / in index.js route file (which i removed as it's kinda repeated)
router.get('/', (req, res, next) => {

  const { user } = req; // Destructure the user information from request

  // Search for all the posts with the find() method and render the view passing the user and the posts
  Post.find()
    .then( posts => res.render('posts/index', { user, posts }))
    .catch( error => console.log(error) );

});

// Route to view all the posts
router.get('/posts', (req, res, next) => {

  const { user } = req; // Destructure the user information from request

  // Search for all the posts with the find() method and render the view passing the user and the posts
  Post.find()
    .then( posts => res.render('posts/index', { user, posts }))
    .catch( error => console.log(error) );

});

// Route to create a new post, we use ensureLoggedIn and uploader as
router.post('/posts', ensureLoggedIn(), uploader.single('image'), (req, res, next) => {

  const { user } = req; // Destructure the user information from request
  const { content }  = req.body; // Destructure the post content from request body, as it was sent by the form
  const image_url = req.file.url; // Extracting the file url and originalname, added by multer
  const image_filename = req.file.originalname;

  // Create a new Post instance for the document creation
  const newPost = new Post({ content, creatorId: user._id, image_url, image_filename });

  // Create a new Post as a mongodb document
  newPost.save()
    .then( post => res.redirect('/posts') )
    .catch( error => {
      console.log(`creatorId is: ${user._id}`);
      res.render('posts/new', { user, error });
    });

});

// Route to render the form to create a new post, ensureLoggedIn is required as middleware
router.get('/posts/new', ensureLoggedIn(), (req, res, next) => {

  const { user } = req;  // Destructure the user information from request

  res.render('posts/new', { user }); // Render the view passing the user info

});

// Route to view a single post
router.get('/posts/:postId', (req, res, next) => {

  const postId = req.params.postId; // Extract the postId from params, in order to use it for the db query
  const { user } = req; // Destructure the user information from request

  // Search for the post using the id and then rendering the view, passing it the user and the post information
  Post.findById(postId)
    .then( post => res.render('posts/show', { user, post }) )
    .catch( error => {
      console.log(`postId is: ${postId}`);
      res.render('posts/index', { user, error });
    });

});

// Router to edit post, ensureLoggedIn and uploader are required again in order to update the db document
router.post('/posts/:postId', ensureLoggedIn(), uploader.single('image'), (req, res, next) => {
  
  // Extract all the needed information coming from the request, also using the properties added by multer
  const postId = req.params.postId;
  const { user } = req;
  const { content } = req.body;
  const image_url = req.file.url;
  const image_filename = req.file.originalname;

  // Make the query using the id from the params, and $setting the data obtained from the request into the document
  Post.update({_id: postId}, {$set: {content, image_url, image_filename }})
    .then( postToMod => {
      console.log('Updated post');
      res.redirect(`/posts/${postId}`);
    })
    .catch( error => {
      console.log(error);
      res.redirect(`/posts/${postId}`);
    });

});

// Route to render the edit form, ensureLoggedIn required as middleware for auth
router.get('/posts/:postId/edit', ensureLoggedIn(), (req, res, next) => {

  // Extract the information needed
  const postId = req.params.postId;
  const { user } = req;

  // Search the post by Id before making a quick verification that the user is the creator of the post
  Post.findById(postId)
    .then( post => {

      console.log(`user: ${user._id}, post: ${post.creatorId}`);
      
      // Here we make the verification, we used the JSON.stringify() method as the type of the id is objectId,
      // and not a string. Maybe it works if we compare it alone, I didn't test it
      if(JSON.stringify(user._id) !== JSON.stringify(post.creatorId)) return res.redirect('/posts');
      
      res.render('posts/edit', { user, post }) 
    })
    .catch( error => {
      console.log(`postId is: ${postId}`);
      res.render('posts/index', { user, error });
    });

});

/*
 Route to delete post. Here I think we need a couple of promises in order to verify that the user is the creator,
 and as we have it right now, anyone who is logged in can just delete a post using the post id and adding /delete
 to the route. 2 promises and a promise all can help us to: 1, extract the post and get the post.creatorId
 into a variable, and then 2, validate that user._id === post.creatorId, and then 3, with the second promise,
 find the post and delete by id. Interestingly, we have to use the method findByIdAndRemove() as the other one,
 findByIdAndDelete() was not recognized as a function. I believe this has something to do with mongoose version
 set in the package.json, we should ask the teacher or TAs
*/
router.post('/posts/:postId/delete', ensureLoggedIn(), (req, res, next) => {

  const postId = req.params.postId;
  const { user } = req;

  Post.findByIdAndRemove(postId)
    .then( post => res.redirect('/posts') )
    .catch( error => {
      console.log(error);
      res.redirect('/posts');
    });

});

module.exports = router;