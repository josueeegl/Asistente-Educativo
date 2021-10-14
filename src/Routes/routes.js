const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

const {
    alumnosCursos
} = require('../controllers/alumno');

const {
    check,
    validationResult
} = require('express-validator');

router.get('/alum', function (req, res, next) {
    alumnosCursos(req, res, next, validationResult);
});

module.exports = router;