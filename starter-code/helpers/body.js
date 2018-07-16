exports.body = (req,res,next) => {
    if(req.file) {
        req.body.photoURL = req.file.url;
        return next();
    }
    res.send('No profile photo');
}

exports.bodyPost = (req,res,next) => {
    if (req.file) {
        req.body.picPath = req.file.url;
        req.body.creatorId = req.user._id;
        return next();
    }
    res.send('No profile photo')
}