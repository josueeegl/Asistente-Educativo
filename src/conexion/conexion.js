const mongoose = require('mongoose'),
    db = 'mongodb://localhost:27017',
    dbname = 'Asistente-educativo';

mongoose.connect(`${db}/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const database = mongoose.connection;

module.exports = database;