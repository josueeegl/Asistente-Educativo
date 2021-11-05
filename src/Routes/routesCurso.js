const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

//#region constantes

const {
    aggCurso,
    BuscarCurso,
    EliminarCurso,
    obtenerCursos,
    updateCurso,
    BuscarCursoID
} = require('../controllers/curso');

const {
    check,
    validationResult
} = require('express-validator');
//#endregion

router.post('/api/curso', function (req, res, next) {
    aggCurso(req, res, next, validationResult);
});
router.get('/api/buscarcurso', function (req, res, next) {
    BuscarCurso(req, res, next, validationResult);
});
router.get('/api/buscarcursoID', function (req, res, next) {
    BuscarCursoID(req, res, next, validationResult);
});
router.get('/api/curso', function (req, res, next) {
    obtenerCursos(req, res, next, validationResult);
});
router.delete('/api/curso', function (req, res, next) {
    EliminarCurso(req, res, next, validationResult);
});

router.put('/api/curso', function (req, res, next) {
    updateCurso(req, res, next, validationResult);
});
module.exports = router;