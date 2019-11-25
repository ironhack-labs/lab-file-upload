const router = require("express").Router();
const { 
    addPhotoView, 
    addPhoto, 
    myPhotosView, 
    editPostGet, 
    editPostPost, } = require("../controllers/photo.controller");

const {
    addComment,
    addCommentGet
} = require("../controllers/comment.controller");

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const uploadCloud = require("../config/cloudinary");
const catchErrors = require("../middlewares/catchErrors");

router.get("/add/:id", ensureLoggedIn('/login'), addPhotoView);
router.post("/add/:id", ensureLoggedIn('/login'), uploadCloud.single("photo"), catchErrors(addPhoto));

router.get("/my-posts/:id", ensureLoggedIn('/login'), catchErrors(myPhotosView));

router.get("/my-posts/edit/:id", editPostGet);
router.post("/my-posts/edit/:id", editPostPost);

router.get("/detail/:id", ensureLoggedIn('/login'), addCommentGet);
router.post("/detail/:id", ensureLoggedIn('/login'), uploadCloud.single("photo"), catchErrors(addComment));


module.exports = router;