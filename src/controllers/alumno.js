const alumno = require('../models/alumno');
const profers = require('../models/profesor');
const curso = require('../models/curso');

module.exports = {

    //#region GET
    //Funcion para mostrar alumnos por el curso seleccionado
    alumnosCursos: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: req.query.curso
            });
            var alumnos = await alumno.find({
                'cursos.id_curso': idcurso._id.toString()
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
        }
    },

    //Obtenemos alumnos por seccion
    alumnosSeccion: async (req, res, next, validationResult) => {
        try {
            var param = req.query.seccion;
            var alumnos = await alumno.find({
                seccion: param   
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },

    //Buscar por nombre y apellido
    alumnosNombre: async (req, res, next, validationResult) => {
        try {
            var alumnos = await alumno.findOne({
                nombres: req.query.nombre,   
                apellidos: req.query.apellido   
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },

    //Buscar por correo
    alumnosCorreo: async (req, res, next, validationResult) => {
        try {
            var alumnos = await alumno.findOne({
                correo: req.query.correo,     
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    //Buscar por carnet
    alumnosCarnet: async (req, res, next, validationResult) => {
        try {
            var alumnos = await alumno.findOne({
                id_estudiante: req.query.carnet,     
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    //Buscar por id telegram
    alumnosbot: async (req, res, next, validationResult) => {
        try {
            var alumnos = await alumno.findOne({
                id_bot: req.query.bot,     
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    }
    //#endregion
    
    //#region POST

    //#endregion POST
}