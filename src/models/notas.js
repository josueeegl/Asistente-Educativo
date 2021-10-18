const mongoose = require('mongoose');
var schema = mongoose.Schema;

var notas = new mongoose.Schema({
    id_estudiante: { type: schema.ObjectId, ref: 'alumno', required: true},
    id_curso: { type: schema.ObjectId, ref: 'curso', required: true},
    pparcial: { type: Number, required: true, default: 0},
    sparcial: { type: Number, required: true, default: 0},
    efinal: { type: Number, required: true, default: 0},
    actividades: { type: Number, required: true, default: 0},
});

module.exports = mongoose.model('notas', notas);