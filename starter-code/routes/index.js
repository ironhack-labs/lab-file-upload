const express = require('express')
const router  = express.Router()
const multer  = require('multer')

/* GET home page. */
 router.get('/', (req, res, next) => {
   res.render('index', { title: 'Express - Generated with IronGenerator' })
});

// router.get('/', function(req, res, next) {
//   Picture.find((err, pictures) => {
//     res.render('index', {pictures})
//   })
// });

// const upload = multer({ dest: './public/uploads/' });
//
//
// router.post('/upload', upload.single('photo'), function(req, res){
//
//   pic = new Picture({
//     name: req.body.name,
//     pic_path: `/uploads/${req.file.filename}`,
//     pic_name: req.file.originalname
//   });
//
//   pic.save((err) => {
//       res.redirect('/');
//   });
// });



module.exports = router;
