const express = require('express');
const router = express.Router();
require('../conexion/conexion'); //conexion a la bd

const {
    index,
    newAlumno
} = require('../controllers/alumno'); 

const {
    check,
    validationResult
} = require('express-validator');

router.get('/', function (req, res, next) {
    index(req, res, next, validationResult);
});

router.post('/', function (req, res, next) {
    newAlumno(req, res, next, validationResult);
});
module.exports = router;