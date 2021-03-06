const mongoose = require('mongoose');
var schema = mongoose.Schema;

var actividad = new mongoose.Schema({
    id_curso: { type: schema.ObjectId, ref: 'curso', required: true},
    id_profe: { type: schema.ObjectId, ref: 'profesor', required: true},
    nombre: { type: String, required: true},
    descripcion: { type: String, required: true},
    dateFinal: { type: String, required: true},
    dateInicial: { type: String, required: true },
});

module.exports = mongoose.model('actividad', actividad);