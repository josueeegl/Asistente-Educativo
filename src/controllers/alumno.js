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
    },
    //#endregion
    //#region POST

    // Agregar un curso al alumno
    aggcursoalum: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: req.query.curso
            });
            var al = await alumno.findOne({
                nombres: req.query.nombre,
                apellidos: req.query.apellido
            });
            al.cursos.push({
                id_curso: idcurso._id.toString(),
                curso: req.query.curso
            });
            al.save();
            res.status(201).send(al);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    // agregar alumno nuevo
    aggalumno: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: req.query.curso
            });
            var al = new alumno({
                id_estudiante: req.query.id_estudiante,
                id_bot: '0',
                nombres: req.query.nombre,
                apellidos: req.query.apellido,
                correo: req.query.correo,
                seccion: req.query.seccion,
                cursos: [{
                    id_curso: idcurso._id.toString(),
                    curso: req.query.curso
                }]
            });

            await al.save();
            res.status(201).send(al);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    //#endregion POST

    //#region PUT
    // actualizar cualquier dato de un alumno
    updateBot: async (req, res, next, validationResult) => {
        try {
            var al = await alumno.findOne({$or: [{correo: req.query.correo},{
                id_estudiante: req.query.id_estudiante
            }, {_id: req.query._id}]});

            await alumno.findOneAndUpdate({ _id: al._id}, {
                id_estudiante: req.query.id_estudiante || al.id_estudiante,
                id_bot: req.query.id_bot || al.id_bot,
                nombres: req.query.nombre || al.nombres,
                apellidos: req.query.apellido || al.apellidos,
                correo: req.query.correo || al.correo,
                seccion: req.query.seccion || al.seccion
            });
            res.status(201).send('Actualizado ');
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    }
    //#endregion PUT
}