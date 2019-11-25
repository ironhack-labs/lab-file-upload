const Comment = require("../models/Comment");
const Photo = require("../models/Photo");


exports.addCommentGet = async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.find({ postId: id});
    const photo = await Photo.findById(id);
    console.log(comments[0])
    res.render("post-detail", { comments, photo})
    
}

exports.addComment = async (req, res) => {
    let commentCreate;
    const { id } = req.params;
    const { content } = req.body;
    console.log(req.file)

    if (req.file) {
        const { secure_url, originalname } = req.file;
        commentCreate = await Comment.create({
            content,
            imgPath: secure_url,
            imgName: originalname,
            creatorId: id,
            postId: id
        });

    } else {
        await Comment.create({
            content,
            creatorId: id,
            postId: id
        });
    }
    res.render('post-detail', { id });
    res.redirect(`${id}`);
}
