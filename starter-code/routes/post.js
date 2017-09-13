const express = require('express');
const passport   = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/posts', ensureLoggedIn(), (req, res) => {
    res.render('show', { message: req.flash('error')});
});


module.exports = router;
