const express    = require('express');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/new",ensureLoggedOut(), (req,res)=>{
    res.render('./posts/new')
})

module.exports=router;