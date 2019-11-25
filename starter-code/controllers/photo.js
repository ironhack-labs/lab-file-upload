const Photo = require("../models/Photo");

exports.addPhotoView = (req, res) => {
    const { id } = req.params;
    res.render("add-photo",  {id})
}

exports.addPhoto = async (req, res) => {
    const { id } = req.params;
    const { title, description  } = req.body;
    
    const { secure_url, originalname } = req.file;

    await Photo.create({
        title,
        description,
        imgPath: secure_url,
        imgName: originalname
    })
    res.redirect("/");
};