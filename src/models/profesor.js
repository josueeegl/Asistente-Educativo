const mongoose = require('mongoose');

var profe = new mongoose.Schema({

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
    cursos: [{
        id_curso: {
            type: String,
            required: true
        }
    }],
    secciones: [{
        seccion: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('profesor', profe);