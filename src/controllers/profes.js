const profes = require('../models/profesor');
const curso = require('../models/curso');
const bcrypt = require("bcryptjs");
var datos = [];

module.exports = {

    //#region GET
    //Funcion para mostrar profesores por el curso seleccionado
    profesCursos: async (req, res, next, validationResult) => {
        try {
            var prof = await profes.findOne({
                correo: req.query.correo
            });
            var i = 0;
            await prof.cursos.forEach(async (item) => {
                var curs = await curso.find({
                    _id: item.id_curso
                });
                curs.forEach((item) => {
                    var data = {
                        id_curso: item._id.toString(),
                        curso: item.curso
                    }
                    datos[i] = data;
                });
                i++;
                obtener(datos);
            })

            function obtener(datos) {
                res.status(200).send(datos);
            }
        } catch (err) {
            console.log(err);
            res.status(404).send(JSON.stringify(err));
        }
    },
    profesSeccion: async (req, res, next, validationResult) => {
        try {
            var prof = await profes.find({
                'secciones.seccion': new RegExp(req.query.seccion, "i")
            }).populate('curso');
            res.status(200).send(prof);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },

    //Buscar 
    buscarprofe: async (req, res, next, validationResult) => {
        try {
            var prof = await profes.find({
                $or: [{
                    nombres: req.query.nombre.toLowerCase(),
                    apellidos: req.query.apellido.toLowerCase()
                }, {
                    correo: req.query.correo.toLowerCase()
                }, {
                    id_bot: req.query.id_bot
                }]
            });
            res.status(200).send(prof);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    //#endregion
    //#region POST

    // Agregar un curso al profe
    aggcursoprof: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: new RegExp(req.query.curso, "i")
            });
            var prof = await profes.findOne({
                _id: req.query.id
            });
            prof.cursos.push({
                id_curso: idcurso._id.toString()
            });
            al.save();
            res.status(201).send(al);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    // agregar profe nuevo
    aggprofe: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: new RegExp(req.query.curso, "i")
            });
            passwordEncriptado = await bcrypt.hash(req.query.password, 10);
            var prof = new profes({
                id_bot: '0',
                nombres: req.query.nombre.toLowerCase(),
                apellidos: req.query.apellido.toLowerCase(),
                correo: req.query.correo.toLowerCase(),
                password: passwordEncriptado,
                cursos: [{
                    id_curso: idcurso._id
                }],
                secciones: [{
                    seccion: req.query.seccion.toLowerCase()
                }]
            });

            await prof.save();
            res.status(201).send(prof);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },
    //#endregion POST

    //#region PUT
    // actualizar cualquier dato de un alumno
    updateProfe: async (req, res, next, validationResult) => {
        try {
            var al = await profes.findOne({
                $or: [{
                    correo: new RegExp(req.query.correo, "i")
                }, {
                    nombres: req.query.nombre,
                    apellidos: req.query.apellido
                }, {
                    _id: req.query._id
                }]
            });

            await profes.findOneAndUpdate({
                _id: al._id
            }, {
                id_bot: req.query.id_bot || al.id_bot,
                nombres: req.query.nombre || al.nombres,
                apellidos: req.query.apellido || al.apellidos,
                correo: req.query.correo || al.correo
            });
            res.status(201).send('Actualizado ');
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    //#endregion PUT


    //#region DELETE
    deleteProfe: async (req, res, next, validationResult) => {
        try {
            var al = await profes.findOne({
                $or: [{
                    correo: new RegExp(req.query.correo, "i")
                }, {
                    nombres: req.query.nombre,
                    apellidos: req.query.apellido
                }, {
                    _id: req.query._id
                }]
            });

            await profes.findOneAndDelete({
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
            var prof = await profes.updateOne({
                $or: [{
                    correo: new RegExp(req.query.correo, "i")
                }, {
                    nombres: req.query.nombre,
                    apellidos: req.query.apellido
                }, {
                    _id: req.query._id
                }]
            }, {
                $pull: {
                    'cursos': {
                        id_curso: idcurso._id.toString() || req.query.id_curso
                    }
                }
            });
            res.status(201).send(prof + ' Eliminado ');
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },

    deleteseccion: async (req, res, next, validationResult) => {
        try {
            var prof = await profes.updateOne({
                $or: [{
                    correo: new RegExp(req.query.correo, "i")
                }, {
                    nombres: req.query.nombre,
                    apellidos: req.query.apellido
                }, {
                    _id: req.query._id
                }]
            }, {
                $pull: {
                    'secciones': {
                        seccion: req.query.seccion.toLowerCase()
                    }
                }
            });
            res.status(201).send(' Eliminado ');
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    }
    //#endregion DELETE
}