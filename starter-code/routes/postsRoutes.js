const router = require("express").Router();
const uploadCloud = require("../config/cloudinary");

const {createPosteGet,createPostPost } = require('../controllers/index.controllers')

router.get('/new', createPosteGet);

router.post('/new/create', uploadCloud.single("photo"), createPostPost);

module.exports= router;