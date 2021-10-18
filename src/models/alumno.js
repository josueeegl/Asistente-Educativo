const mongoose = require('mongoose');
var schema = mongoose.Schema;

var alumno = new mongoose.Schema({
    id_estudiante: {
        type: String,
        required: true,
        unique: true
    },
    id_bot: {
        type: String,
        unique: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    seccion: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    cursos: [{
        id_curso: { type: schema.ObjectId, ref: 'curso', required: true}
    }]
});


module.exports = mongoose.model('alumno', alumno);