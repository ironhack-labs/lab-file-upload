// configs/cloudinary.config.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dry1pnkm4',
    api_key: '194261843127515',
    // api_secret: process.env.CLOUDINARY_SECRET
    api_secret: 'hbp2e5FyTRarb-zMnFqUyHpPCz0'

});

/*
const storage = new CloudinaryStorage({
    // cloudinary: cloudinary,
    cloudinary,
    folder: 'iron', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
    filename: function(req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});
*/

const storage = new CloudinaryStorage({   // cloudinary: cloudinary,
      
    cloudinary,
      params: (req, file) => { 
        return { 
            folder: "iron",
            allowed_formats: ["jpg", "png"],
            public_id: `app-${file.originalname}`    
        }  
    }
})


//                        storage: storage
const uploadCloud = multer({ storage });

module.exports = uploadCloud;