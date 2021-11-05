const mongoose = require('mongoose');
var schema = mongoose.Schema;

var alumActivity = new mongoose.Schema({
    id_estudiante: { type: schema.ObjectId, ref: 'alumno', required: true},
    id_activity: { type: schema.ObjectId, ref: 'actividad', required: true},
    estado: { type: String, required: true},
    nota: { type: String, required: true, default: 'No calificado'}
});

module.exports = mongoose.model('alumActivity', alumActivity);