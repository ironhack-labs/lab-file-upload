const express = require('express');
const router = express.Router();
const path = require('path');
const debug = require('debug')(`m2-0118-basic-auth:${path.basename(__filename).split('.')[0]}`);
const User = require('../models/user');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* router.get('/profile', (req, res, next) => {
    res.render('profile', {
        title: "profile"
    });
}); */

/* CRUD -> READ DETAIL */
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    let actualUser;
    if (req.user != null) {
        actualUser = req.user._id;
    }
    
    User.findById(userId, (err, u) => {
        if (err) {
            return next(err);
        }
        res.render('profile', {
            title:'Edit profile',
            user:req.user,
            u:u,
            actualUser:actualUser
        });
    });
})

/* CRUD -> UPDATE USER FORM */
router.get('/:id/edit', (req, res) => {
    
    const userId = req.params.id;
    let actualUser = req.user._id;
    if (actualUser === userId) {
        User.findById(userId, (err, u) => {
            if (err) {
                return next(err);
            }
            res.render('edit-user', {
                u:req.user
            });
        });
    } else {
        res.redirect(`/`);
    }
})

/* CRUD -> UPDATE USER in DATABASE */
router.post('/:id/', (req, res) => {
    const userId = req.params.id;
    const {username, password, confirmPassword, email, summary, imageUrl, company, jobTitle} = req.body;
    var updates;
    if ((password != '') && (confirmPassword != '')) {
        if (password === confirmPassword) {
            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);
            updates = { username, password:hashPass, email, summary, imageUrl, company, jobTitle };
        } else {
            res.render('edit-user', {
                u:req.user,
                errorMessage: "The passwords do not match!"
            });
            return;
        }
    } else {
        updates = {username, email, summary, imageUrl, company, jobTitle};
    }

    User.findByIdAndUpdate(userId, updates, (err, user) => {
        if (err) {
            return next(err);
        }
        return res.redirect(`/profile/${userId}`);
    });
})

/* CRUD -> DELETE USER FROM DATABASE */

router.get('/:id/delete', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndRemove(userId, (err, usr) => {
        if (err) {
            return next(err);
        }
        return res.redirect('/');
    });
});


module.exports = router;