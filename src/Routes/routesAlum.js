const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

//#region constantes
const {
    alumnosCursos, alumnosSeccion, alumnosNombre, alumnosCorreo, alumnosCarnet, alumnosbot
} = require('../controllers/alumno');

const {
    check,
    validationResult
} = require('express-validator');
// #endregion

//#region GET
router.get('/api/alumCursos', function (req, res, next) {
    alumnosCursos(req, res, next, validationResult);
});
router.get('/api/alumSeccion', function (req, res, next) {
    alumnosSeccion(req, res, next, validationResult);
});
router.get('/api/alumNombre', function (req, res, next) {
    alumnosNombre(req, res, next, validationResult);
});
router.get('/api/alumCorreo', function (req, res, next) {
    alumnosCorreo(req, res, next, validationResult);
});
router.get('/api/alumCarnet', function (req, res, next) {
    alumnosCarnet(req, res, next, validationResult);
});
router.get('/api/alumbot', function (req, res, next) {
    alumnosbot(req, res, next, validationResult);
});
// #endregion


module.exports = router;