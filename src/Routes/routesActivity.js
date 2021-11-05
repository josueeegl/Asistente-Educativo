const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

//#region constantes
const {
    verificarToken
} = require('../middleware/log');
const {
    newActivity,
    getActivityCurso,
    updateActivity,
    statusActivity,
    NotaActivity,
    notasUpdate, buscaractivity
} = require('../controllers/actividades');

const {
    check,
    validationResult
} = require('express-validator');
//#endregion

router.post('/api/activity/nueva', function (req, res, next) {
    newActivity(req, res, next, validationResult);
});

router.get('/api/activity/obtener', function (req, res, next) {
    getActivityCurso(req, res, next, validationResult);
});
router.get('/api/activity/buscar', function (req, res, next) {
    buscaractivity(req, res, next, validationResult);
});

router.put('/api/activity/update', function (req, res, next) {
    updateActivity(req, res, next, validationResult);
});

router.put('/api/activity/status', function (req, res, next) {
    statusActivity(req, res, next, validationResult);
});
router.put('/api/activity/nota', function (req, res, next) {
    NotaActivity(req, res, next, validationResult);
});
router.put('/api/calificacion/notas',verificarToken, function (req, res, next) {
    notasUpdate(req, res, next, validationResult);
});
module.exports = router;