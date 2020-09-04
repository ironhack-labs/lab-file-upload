// models/Post.model.js

const { Schema, model } = require('mongoose');

const PostSchema = new Schema({

    // Contenido
    content: {
        type: String,
        required: [true, 'Campo requerido'],
    },


    // Guardamos el usurio que creo el post
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },


    picPath: {
        type: String
    },

    picName: {
        type: String
    }


}, {
    timestamps: true
});

module.exports = model('Post', PostSchema);