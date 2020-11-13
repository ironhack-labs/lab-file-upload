const express = require('express');
const router = express.Router();
const fileUploader = require('../configs/cloudinary')
const {
  getAllPosts, 
  viewForm, 
  createPost, 
  displayDetails
} = require('../controllers/postControllers')

const routeGuard = require('../configs/route-guard.config');


/* GET home page */
// router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

//the GET route to display the posts (NEW HOME PAGE)
router.get('/', getAllPosts)

//the GET route to display the post-form,
router.get('/new-post', routeGuard, viewForm)

//the POST route to actually create the post (this route should include file uploading)
router.post('/new-post', fileUploader.single('image'), createPost)

//the GET route to display post-details.
router.get('/post', displayDetails)


module.exports = router;
