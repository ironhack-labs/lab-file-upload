const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
	cloud_name: 'dmqmju7gk',
	api_key: '499883241937946',
	api_secret: 'LDBzvFP0YQGSrCOG-UoUf2o6yrE'
})

var storageCloud = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'webmad0719', // The name of the folder in cloudinary
	allowedFormats: ['jpg', 'png'],
	filename: function(req, file, cb) {
		cb(null, file.originalname) // The file on cloudinary would have the same name as the original file name
	}
})

const uploadCloud = multer({ storage: storageCloud })

module.exports = uploadCloud
