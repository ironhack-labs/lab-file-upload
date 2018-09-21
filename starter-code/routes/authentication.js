const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer = require('multer');
const User = require('../models/user')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', (req,res))
    .then(() => {
        res.redirect('/profile')
    })


router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

const upload = multer({ dest: './public/uploads/' });
router.post('/signup', upload.single('photo'), function (req,res) {
    
        let newUser = new User({
            username: req.body.username,
            email:  req.body.email,
            password:   req.body.password,
            picName: req.body.picName,
            path: `/uploads/${req.file.filename}`,
            picOriginalName: req.body.photo
          })
        
          newUser.save((err) => {
              res.redirect('/');
          })
        })

        
router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
