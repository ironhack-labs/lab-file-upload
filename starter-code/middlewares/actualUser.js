const actualUser = (req,res,next) => {
    if(req.user._id == req.params.id){
        next();
    }else{
        console.log("[Forbidden] User cannot access this page");
        res.redirect('/');
    }
}

module.exports = actualUser;