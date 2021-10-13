const mongoose = require('mongoose');

var alumno = new mongoose.Schema({
    id_estudiante: String,
    id_bot: String,
    nombres: String,
    apellidos: String,
    correo: String,
    grado: String,
    seccion: String,
    cursos: [{
        id_curso: String
    }]
});

module.exports = mongoose.model('alumno', alumno);