const alumno = require('../models/alumno');
const curso = require('../models/curso');
const notas = require('../models/notas');
var datos = [];
module.exports = {

    //#region GET
    //Funcion para mostrar alumnos por el curso seleccionado
    alumnosCursos: async (req, res, next, validationResult) => {
        try {
            var alumnos = await alumno.find({
                'cursos.id_curso': req.query.id_curso
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
        }
    },
    alumnosNotas: async (req, res, next, validationResult) => {
        try {
            var nt = await notas.findOne({
                id_estudiante: req.query.id_estudiante
            });
            var data = {
                nombre: `${req.query.nombre}`,
                id_alumno: nt.id_estudiante,
                pparcial: nt.pparcial,
                sparcial: nt.sparcial,
                efinal: nt.efinal,
                actividades: nt.actividades
            };
            res.status(200).send(data);
        } catch (err) {
            res.status(404).send(JSON.stringify(err));
        }
    },
    alumnosSeccion: async (req, res, next, validationResult) => {
        try {
            var alumnos = await alumno.find({
                seccion: new RegExp(req.query.seccion, "i")
            });
            res.status(200).send(alumnos);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },

    //Buscar 
    buscaralumno: async (req, res, next, validationResult) => {
        try {
            var alum = await alumno.findOne({
                $or: [{
                    'id_estudiante': req.query.id_estudiante
                }, {
                    'correo': req.query.correo
                }, {
                    'id_bot': req.query.id_bot
                }]
            });
            if(alum == null){
                res.status(200).send(JSON.stringify('no he encontrado'));
            }
            res.status(200).send(alum);
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
                curso: new RegExp(req.query.curso, "i")
            });
            var al = await alumno.findOne({
                $or: [{
                    nombres: new RegExp(req.query.nombre, "i"),
                    apellidos: new RegExp(req.query.apellido, "i")
                }, {
                    id_estudiante: req.query.id_estudiante
                }]

            });
            al.cursos.push({
                id_curso: idcurso._id.toString(),
                curso: idcurso.curso
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
                curso: new RegExp(req.query.curso, "i")
            });
            var al = new alumno({
                id_estudiante: req.query.id_estudiante,
                id_bot: '0',
                nombres: req.query.nombre.toLowerCase(),
                apellidos: req.query.apellido.toLowerCase(),
                correo: req.query.correo.toLowerCase(),
                seccion: req.query.seccion.toLowerCase(),
                cursos: [{
                    id_curso: idcurso._id.toString(),
                    curso: idcurso.curso
                }]
            });

            await al.save();

            var nt = new notas({
                id_estudiante: al._id.toString(),
                id_curso: idcurso._id.toString()
            });

            await nt.save();
            res.status(201).send(JSON.stringify(`Alumno ${al.nombres} ingresado`));
        } catch (err) {
            res.status(404).send(JSON.stringify(`error al guardar`));
            console.log(err);
        }
    },
    //#endregion POST

    //#region PUT
    // actualizar cualquier dato de un alumno
    updateAlum: async (req, res, next, validationResult) => {
        try {
            var al = await alumno.findOne({
                $or: [{
                    correo: new RegExp(req.query.correo, "i")
                }, {
                    id_estudiante: req.query.id_estudiante
                }, {
                    _id: req.query._id
                }]
            });

            await alumno.findOneAndUpdate({
                _id: al._id
            }, {
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
    },
    //#endregion PUT

    //#region DELETE
    deleteAlum: async (req, res, next, validationResult) => {
        try {
            var al = await alumno.findOne({
                $or: [{
                    correo: new RegExp(req.query.correo, "i")
                }, {
                    id_estudiante: req.query.id_estudiante
                }, {
                    _id: req.query._id
                }]
            });

            await alumno.findOneAndDelete({
                _id: al._id
            });
            res.status(201).send(al.nombres + ' Eliminado ');
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    deleteCurso: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: new RegExp(req.query.curso, "i")
            });
            var alumnos = await alumno.updateOne({
                $or: [{
                    correo: new RegExp(req.query.correo, "i")
                }, {
                    id_estudiante: req.query.id_estudiante
                }, {
                    _id: req.query._id
                }]
            }, {
                $pull: {
                    'cursos': {
                        id_curso: idcurso._id.toString()
                    }
                }
            });
            console.log(alumnos);
            res.status(201).send(alumnos + ' Eliminado ');
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    }
    //#endregion DELETE
}