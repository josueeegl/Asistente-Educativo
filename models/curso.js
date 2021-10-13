const mongoose = require('mongoose');

var curso = new mongoose.Schema({
    id_curso: string,
    curso: string
});

module.exports = mongoose.model('curso', curso);