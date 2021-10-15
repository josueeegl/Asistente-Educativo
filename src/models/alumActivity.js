const mongoose = require('mongoose');

var alumActivity = new mongoose.Schema({
    id_estudiante: { type: String, required: true},
    id_activity: { type: String, required: true},
    estado: { type: String, required: true}
});

module.exports = mongoose.model('alumActivity', alumActivity);