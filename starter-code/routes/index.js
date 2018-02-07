const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

// router.get("/", (req, res) => {
//   User
//       .find({userId : req.user._id})
//       .sort({
//           created_at: -1
//       })
//       .exec((err, name) => {
//           console.log(name)
//           res.render("index", {
//               name
//           });
//       });
// });


module.exports = router;
