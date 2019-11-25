const Photo = require("../models/Photo");

exports.addPhotoView = (req, res) => {
    const { id } = req.params;
    res.render("add-photo", {id});
}

exports.addPhoto = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.file)
    const { secure_url, originalname } = req.file;

    await Photo.create({
        title,
        description,
        imgPath: secure_url,
        imgName: originalname,
        creatorId: id
    });
    //res.render('index', { id });
    res.redirect(`/photo/my-posts/:id`);
}


exports.myPhotosView = async (req, res, next) => {
    const { id } = req.params;
    const photos = await Photo.find({ creatorId: id});
    res.render("my-posts", { photos, id});
}


exports.editPostGet = async (req, res, next) => {
    const { id } = req.params;
    const post = await Photo.findById(id);
    res.render("edit-post", { post });
}

exports.editPostPost = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    // const { secure_url, originalname } = req.file;
    // console.log(req.file)

    await Photo.findByIdAndUpdate(id, { $set: { 
        title: title,
        description: description,
        // imgPath: secure_url,
        // imgName: originalname,
     }
    });

    res.redirect("/photo/my-posts/:id");
}
