const mongoose = require('mongoose');
 const Schema   = mongoose.Schema;

 const UserSchema = Schema(
  {
    username: String,
    email: String,
    password: String,
    photoURL: String,
    location: {
      type: {
        type: String,
        default: "Point"
      },
      address: String,
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    citas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cita"
      }
    ],
    role: {
      type: String,
      enum: ["Paciente", "Profesional"],
      default: "Paciente"
    },
    cedula: String,
    especialidad: String,
    titulo: {
      type: String,
      enum: ["Doctor", "Enfermera"]
    },
    comentarios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comentario"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

 module.exports = mongoose.model('User', UserSchema);