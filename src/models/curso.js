const mongoose = require('mongoose');

var curso = new mongoose.Schema({

    curso: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('curso', curso);