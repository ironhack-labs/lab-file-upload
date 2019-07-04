const express = require('express');
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' });
const router = express.Router();
const PostBlog = require('../models/Post')


router.get('/list', ensureAuthenticated, (req, res, next) => {
    PostBlog.
    find()
        .then(posts => {
            res.render("post/list", { posts })
        }).catch((err) => {
            console.log(err)
        });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/login')
    }
}

router.get('/newpost', (req, res, next) => {
    res.render("post/newpost")
});

router.post('/newpost', upload.single('photo'), (req, res, next) => {
    PostBlog
        .create({
            title: req.body.title,
            content: req.body.content,
            creatorId: req.user._id,
            picture: {
                picName: req.body.name,
                picPath: `/uploads/${req.file.filename}`,
                originalNamePict: req.file.originalname
            }
        })
        .then(postNew => {
            res.redirect("/postBlog/list")
        }).catch((err) => {
            console.log(err)
        })
});

router.get('/detail/:id', (req, res, next) => {
    PostBlog
        .findOne({ _id: req.params.id })
        .then(postDetail => {
            res.render("post/detail", { postDetail })
        }).catch((err) => {
            console.log(err)
        });

});

router.get('/edit/:id', (req, res, next) => {
    PostBlog
        .findOne({ _id: req.params.id })
        .then(onepost => {
            res.render("post/edit", { onepost })
        }).catch((err) => {
            console.log(err)
        });

});

// router.post("/edit-post", upload.single('photo'), (req, res) => {
router.post("/edit-post", (req, res) => {
    const file = req.file
        // if (!file) {
        //     const error = new Error('Please upload a file')
        //     error.httpStatusCode = 400
        //     return next(error)
        // }
    PostBlog
        .findByIdAndUpdate(req.body._id, {
            title: req.body.title,
            name: req.body.name,
            type: req.body.type
                // picture: {
                //     picName: req.body.name,
                //     picPath: `/uploads/${req.file.filename}`,
                //     originalNamePict: req.file.originalname
                // }
        })
        .then(updatedPlace => {
            res.redirect("/postBlog/list")
        })
        .catch((err) => {
            console.log(err)
        });
})

router.post('/:id/delete', (req, res, next) => {
    PostBlog
        .findByIdAndRemove({ _id: req.params.id })
        .then(
            placeDelete => res.redirect("/postBlog/list"))
        .catch((err) => {
            console.log(err)
        });
});



module.exports = router;