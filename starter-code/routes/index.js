const express = require('express');
const router  = express.Router();
const Post = require('../models/post')


/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .then(post =>{
    console.log("este es el session id ===>" + req.session.passport.user)
    console.log("este es el user id ===>" + req.user.id)
     res.render("index", {post})
  })
  
});

// const isRole = (user, role) => user && user.role === role

// router.get('/', (req, res, next) => {
//   res.render('index', {fan: isRole(req.user, "Fan"),
//                       backliner: isRole(req.user, "Backliner"),
//                       artist: isRole(req.user, "Artist")
//                     });
// });



module.exports = router;
