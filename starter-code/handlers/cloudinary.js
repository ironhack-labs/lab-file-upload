const multer = require('multer') //middleware para soportar archivos
const cloudinary = require('cloudinary') // para guardar imágenes
const cS = require('multer-storage-cloudinary') //guarda cookies en la computadora

//configurar cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//configurar storage
const storage = cS({
    cloudinary: cloudinary, //se me olvidó qué le estoy diciendo aquí?
    folder: 'lab-file',
    alowedFormats: ['jpg', 'png'],
    filename: (req, file, cb) => { //función para callback que no entiendo
        cb(null, file.originalname) //no entiendo para qué era esto, parace que es para mantener el nombre del archivo original? O.o
    }
})

const uploadCloud = multer({ storage }) //hago función uploadCloud que tenga el comportamiento de storage

module.exports = uploadCloud //exporto para tenerlo disponible y poder llamarlo en cualquier archivo
