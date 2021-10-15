const profes = require('../models/profesor');
const curso = require('../models/curso');

module.exports = {

    //#region GET
    //Funcion para mostrar profesores por el curso seleccionado
    profesCursos: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: new RegExp(req.query.curso, "i")
            });
            var prof = await profes.find({
                'cursos.id_curso': idcurso._id.toString()
            });
            res.status(200).send(prof);
        } catch (err) {
            res.status(404).send('No he encontrado');
        }
    },
    profesSeccion: async (req, res, next, validationResult) => {
        try {
            var prof = await profes.find({
                'secciones.seccion': new RegExp(req.query.seccion, "i")
            });
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
            var prof = new profes({
                id_bot: '0',
                nombres: req.query.nombre.toLowerCase(),
                apellidos: req.query.apellido.toLowerCase(),
                correo: req.query.correo.toLowerCase(),
                cursos: [{
                    id_curso: idcurso._id.toString()
                }],
                secciones: [{
                    seccion: req.query.seccion.toLowerCase()
                }]
            });

            await prof.save();
            res.status(201).send(prof);
        } catch (err) {
            res.status(404).send('No he encontrado');
            console.log(err);
        }
    },
    //#endregion POST


}