const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

//#region constantes

const {
    newActivity,
    getActivityCurso,
    updateActivity,
    statusActivity
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

router.put('/api/activity/update', function (req, res, next) {
    updateActivity(req, res, next, validationResult);
});

router.put('/api/activity/status', function (req, res, next) {
    statusActivity(req, res, next, validationResult);
});
module.exports = router;