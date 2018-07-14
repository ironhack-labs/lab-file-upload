exports.completeBody = (req, res, next) => {
  if(req.file) {
    req.body.photoURL = req.file.url;
    return next();
  }
  res.send('no photo!');
}

exports.completeBodyPost = (req, res, next) => {
  if(req.file) {
    req.body.pic = req.file.url;
    req.body.creatorId = req.user._id;
    return next();
  }
  res.send('no photo!');
}