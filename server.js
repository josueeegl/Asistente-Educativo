const express = require('express'),
    app = express(),
    puerto = process.env.port || 3000,
    bodyParser = require('body-parser'),
    path = require('path');

//configuraciones
let path_inicial = path.join(__dirname, '/web');
app.set('views', path.join(path_inicial, 'pages'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'web')));

//Rutas de servicio
app.get('/', (req, res) => {
    res.render('index.html', {
        data: req.query.data
    });
});
app.use(require('./src/Routes/routesProf')); //Rutas profesor
app.use(require('./src/Routes/routesAlum')); //Rutas alumno
app.use(require('./src/Routes/routesCurso')); //Rutas curso
app.use(require('./src/Routes/routesActivity')); //Rutas actividades


require('./BOT/bot_server');

app.listen(puerto, () => console.log("Escuchando en el puerto " + puerto));