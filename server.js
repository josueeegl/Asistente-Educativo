const express = require('express'),
    app = express(),
    puerto = process.env.port || 3000,
    bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({
    extended: true
}));


//Rutas de servicio
app.use(require('./src/Routes/routes'));


app.listen(puerto, () => console.log("Escuchando en el puerto " + puerto));