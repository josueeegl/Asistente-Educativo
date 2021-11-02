const mongoose = require('mongoose');
var schema = mongoose.Schema;

var alumno = new mongoose.Schema({
    id_estudiante: {
        type: String,
        required: true,
        unique: true
    },
    id_bot: String,
    codigo_correo: String,
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
    cursos: [{
        id_curso: {
            type: schema.ObjectId,
            ref: 'curso',
            required: true
        }
    }]
});


module.exports = mongoose.model('alumno', alumno);