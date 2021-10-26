const mongoose = require('mongoose');
var schema = mongoose.Schema;

var profe = new mongoose.Schema({

    id_bot: String,
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
    password: {
        type: String,
        required: true
    },
    token: String,
    cursos: [{
        id_curso: {
            type: schema.Types.ObjectId,
            ref: 'curso',
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