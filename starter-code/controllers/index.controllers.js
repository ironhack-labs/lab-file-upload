const Post = require("../models/Post");

exports.createPosteGet = (req, res, next) => {
    res.render('postCreate');
}

exports.createPostPost = async (req, res, next) => {
    console.log(req.file)
    const { _id } = req.user;
    const { description } = req.body;
    // Gracias a multer, que parsea el archivo que recibimos del formulario, tenermos la propiedad file del request (req.file) con la información del archivo procesado.
    const { secure_url, originalname } = req.file;  
    console.log(secure_url,originalname)
    await Post.create({
      description,
      creatorId: _id,
      imgPath: secure_url,
      imgName: originalname
    });
    res.redirect('/');
}
