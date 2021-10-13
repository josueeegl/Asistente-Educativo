const mongoose = require('mongoose'),
    db = 'mongodb://localhost:27017',
    dbname = 'Asistente-educativo';

mongoose.connect(`${db}/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const database = mongoose.connection;

function conectar (){
    database.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
    database.once('open', () => {
    console.log(`conectado a ${database.name}`); // si esta todo ok, imprime esto
});
}

module.exports = conectar();