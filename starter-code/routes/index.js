const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const Picture  = require('../models/picture');
const upload   = multer({ dest: './public/uploads'});
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* GET home page. */
router.get("/",(req,res)=>{
  res.render("index");
})


router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
      user : req.user
  });
});

router.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save(() => {
      res.redirect('/profile');
  });
});

module.exports = router;
