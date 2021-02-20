// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Photo = require('../models/Photo.model'); // llamamos al esquema de las fotos
const mongoose = require('mongoose');
//const Picture = require('../models/picture');
const Post = require('../models/Post.model');

const routeGuard = require('../configs/route-guard.config');

const multer = require('multer'); //llamamos al multer
const upload = multer({ dest: './public/uploads/' }); // le decimos a multer que el archivo lo meta en la carpeta upLoads...................................................

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// .post() route ==> to process form data
router.post('/signup', upload.single('photo'), (req, res, next) => {
    //upload.single es para subir una sola foto y la guarda con un nombre aleatorio en la carpeta public/upload

    //El req.file es un objeto que  crea Multer y ahí podemos ver el filename

    if (req.file) {
        req.body.photo = `/uploads/${req.file.filename}`
    }


    const { username, email, password, photo } = req.body; //le agregué la photo

    if (!username || !email || !password || !photo) { //le agregué la photo
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }

    // make sure passwords are strong:
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res
            .status(500)
            .render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                // username: username
                username,
                email,
                //Añadimos el campo photo
                photo,
                // passwordHash => this is the key from the User model
                //     ^
                //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
                passwordHash: hashedPassword
            });
        })
        .then(userFromDB => {
            console.log('Newly created user is: ', userFromDB);
            res.redirect('/userProfile');
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', { errorMessage: error.message });
            } else if (error.code === 11000) {
                res.status(500).render('auth/signup', {
                    errorMessage: 'Username and email need to be unique. Either username or email is already used.'
                });
            } else {
                next(error);
            }
        }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .get() route ==> to display the login form to users
router.get('/login', (req, res) => res.render('auth/login'));

// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return;
    }

    User.findOne({ email })
        .populate('post')
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, user.passwordHash)) {
                req.session.currentUser = user;
                res.redirect('/userProfile');
            } else {
                res.render('auth/login', { errorMessage: 'Incorrect password.' });
            }
        })
        .catch(error => next(error));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/userProfile', routeGuard, (req, res) => {
    res.render('users/user-profile');
});

/////////////////////////// AQUI VA LO DE LOS POST///////////////////////////////

//CREAMOS LA RUTA PARA CREAR LOS POSTS
router.get('/create', (req, res, next) => {
    res.render("user-profile")
})

//ESTA ES LA RUTA QUE INCLUYE SUBIR LA FOTO Y QUE CREA EL POST
//le paso el path que es donde está la foto
router.post('/create', upload.single("path"), (req, res, next) => {
    // console.log(req.body)
    //console.log(req.file)
    req.body.creatorId = req.session.currentUser._id

    if (req.file) {
        req.body.path = `/uploads/${req.file.filename}`
    }

    Post.create(req.body)
        .then(() => {
            res.render('/') //aqui esta el problema no se ve
        })
        .catch((e) => next(e))
})


module.exports = router;