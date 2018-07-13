exports.completeBody = (req,res,next) => {
  if(req.file){
      req.body.profilePicURL = req.file.url;
      return next();
  }
  res.send('No hay foto');
}

exports.completeBodyPost = (req,res,next) => {
  if(req.file){
      req.body.picPath = req.file.url;
      req.body.creatorId = req.user._id
      return next();
  }
  res.send('No hay foto');
}