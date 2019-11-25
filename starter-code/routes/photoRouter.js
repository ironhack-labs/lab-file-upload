const router = require("express").Router();
const { 
    addPhotoView, 
    addPhoto, 
    myPhotosView, 
    editPostGet, 
    editPostPost, } = require("../controllers/photo");


const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const uploadCloud = require("../config/cloudinary");
const catchErrors = require("../middlewares/catchErrors");

router.get("/add", addPhotoView);
router.post("/add", uploadCloud.single("photo"), catchErrors(addPhoto));

module.exports = router;