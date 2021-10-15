const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

//#region constantes

const {
    profesCursos,
    profesSeccion,
    buscarprofe,
    aggcursoprof,
    aggprofe
} = require('../controllers/profes');

const {
    check,
    validationResult
} = require('express-validator');
//#endregion

//#region GET
router.get('/api/profe/cursos', function (req, res, next) {
    profesCursos(req, res, next, validationResult);
});

router.get('/api/profe/seccion', function (req, res, next) {
    profesSeccion(req, res, next, validationResult);
});

router.get('/api/profe/buscar', function (req, res, next) {
    buscarprofe(req, res, next, validationResult);
});

//#endregion

//#region POST
router.post('/api/profe/curso', function (req, res, next) {
    aggcursoprof(req, res, next, validationResult);
});

router.post('/api/profe/nuevo', function (req, res, next) {
    aggprofe(req, res, next, validationResult);
});
//endregion

module.exports = router;