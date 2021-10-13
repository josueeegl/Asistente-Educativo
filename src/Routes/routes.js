const express = require('express');
const router = express.Router();
const conexion = require('../conexion/conexion');
var alumno = require('../../models/alumno');

const {
    check,
    validationResult
} = require('express-validator');

conexion.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
conexion.once('open', () => {
    console.log(`conectado a ${conexion.name}`); // si esta todo ok, imprime esto
});

router.get('/prueba', function (req, res) {
    var nuevoalumno = new alumno({
        id_estudiante: '1',
        id_bot: '1',
        nombres: 'Josue',
        apellidos: 'Garcia',
        correo: 'jajaj',
        grado: '5t8',
        seccion: 'A',
        cursos: [{
            id_curso: '1'
        }, {
            id_curso: '2'
        }]
    });

    nuevoalumno.save(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send('Datos insertados');
        }
    });
});
module.exports = router;