const mongoose = require('mongoose');

var actividad = new mongoose.Schema({
    id_curso: { type: String, required: true},
    id_profe: { type: String, required: true},
    nombre: { type: String, required: true},
    descripcion: { type: String, required: true},
    dateFinal: { type: Date, required: true},
    dateInicial: { type: String, required: true, default: Date.now },
});

module.exports = mongoose.model('actividad', actividad);