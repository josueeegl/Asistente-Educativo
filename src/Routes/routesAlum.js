const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd
const {
    verificarToken
} = require('../middleware/log');
//#region constantes
const {
    alumnosCursos,
    alumnosSeccion,
    buscaralumno,
    aggcursoalum,
    aggalumno,
    updateAlum,
    deleteAlum,
    deleteCurso, alumnosNotas, alumnosActividades
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
router.get('/api/alumActi', function (req, res, next) {
    alumnosActividades(req, res, next, validationResult);
});
router.get('/api/alumNotas', function (req, res, next) {
    alumnosNotas(req, res, next, validationResult);
});
router.get('/api/alumSeccion', function (req, res, next) {
    alumnosSeccion(req, res, next, validationResult);
});
router.get('/api/buscaralumno', function (req, res, next) {
    buscaralumno(req, res, next, validationResult);
});
// #endregion

//#region POST
router.post('/api/alumCursos', function (req, res, next) {
    aggcursoalum(req, res, next, validationResult);
});

router.post('/api/alumnos', verificarToken, function (req, res, next) {
    aggalumno(req, res, next, validationResult);
});
//#endregion POST

//#region PUT
router.put('/api/alumno', function (req, res, next) {
    updateAlum(req, res, next, validationResult);
});
//#endregion PUT

//#region DELETE
router.delete('/api/alumno', function (req, res, next) {
    deleteAlum(req, res, next, validationResult);
});
router.delete('/api/cursoalumno', function (req, res, next) {
    deleteCurso(req, res, next, validationResult);
});
//#endregion DELETE
module.exports = router;