const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

//#region constantes

const {
    profesCursos,
    profesSeccion,
    buscarprofe,
    aggcursoprof,
    aggprofe,
    updateProfe, deleteProfe, deleteCurso, deleteseccion
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
//#endregion


router.put('/api/profe/update', function (req, res, next) {
    updateProfe(req, res, next, validationResult);
});

router.delete('/api/profe/delete', function (req, res, next) {
    deleteProfe(req, res, next, validationResult);
});

router.delete('/api/profe/deletecurso', function (req, res, next) {
    deleteCurso(req, res, next, validationResult);
});

router.delete('/api/profe/deleteseccion', function (req, res, next) {
    deleteseccion(req, res, next, validationResult);
});
module.exports = router;