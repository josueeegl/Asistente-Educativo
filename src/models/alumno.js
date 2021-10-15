const mongoose = require('mongoose');

var alumno = new mongoose.Schema({
    id_estudiante: { type: String, required: true, unique: true },
    id_bot: { type: String, unique: true },
    nombres: { type: String, required: true},
    apellidos: { type: String, required: true},
    correo: { type: String, required: true, unique: true},
    seccion: { type: String, required: true},
    cursos: [{
        id_curso: { type: String, required: true}
    }]
});

module.exports = mongoose.model('alumno', alumno);