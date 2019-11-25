const Post = require('../models/Post')

exports.getPostCreate = (req, res, next) => {
  res.render('create')
}

exports.postPostCreate = async (req, res, next) => {
  const {
    _id
  } = req.user;
  const {
    content
  } = req.body;
  // Gracias a multer, que parsea el archivo que recibimos del formulario, tenermos la propiedad file del request (req.file) con la información del archivo procesado.
  const {
    secure_url,
    originalname
  } = req.file;
  await Post.create({
    content: content,
    creatorId: _id,
    picPath: secure_url,
    picName: originalname
  });
  res.redirect('/');
}