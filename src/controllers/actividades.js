const alumno = require('../models/alumno');
const curso = require('../models/curso');
const activities = require('../models/actividades');
const alumActivity = require('../models/alumActivity');
const notas = require('../models/notas');

module.exports = {

    // POST
    newActivity: async (req, res, next, validationResult) => {
        try {

            var act = new activities({
                id_curso: req.query.id_curso,
                id_profe: req.query.id_profe,
                nombre: req.query.nombre.toLowerCase(),
                descripcion: req.query.descripcion,
                dateFinal: new Date(req.query.dateFinal),
                dateInicial: new Date(),
            });
            await act.save();

            var alumnos = await alumno.find({
                'cursos.id_curso': req.query.id_curso
            }, function (err, person) {
                person.forEach(item => {
                    var alacti = alumActivity({
                        id_estudiante: item._id.toString(),
                        id_activity: act._id.toString(),
                        estado: 'ACTIVO'
                    })
                    alacti.save();
                })
            }).clone();


            res.status(201).send('Tarea publicada');
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }

    },

    // GET 
    getActivityCurso: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: new RegExp(req.query.curso, "i")
            });
            var act = await activities.find({
                $or: [{
                    id_curso: idcurso._id.toString()
                }, {
                    id_curso: req.query.id_curso
                }]

            }).populate('curso').populate('profesor');
            res.status(200).send(act);
        } catch (err) {
            res.status(404).send('No he encontrado');
        }

    },

    //PUT
    updateActivity: async (req, res, next, validationResult) => {
        try {
            var act = await activities.findOne({
                _id: req.query.id_activity
            });
            if (!req.query.dateFinal) {
                req.query.dateFinal = act.dateFinal
            }
            await activities.findOneAndUpdate({
                _id: req.query.id_activity
            }, {
                nombre: req.query.nombre || act.nombre,
                descripcion: req.query.descripcion || act.descripcion,
                dateFinal: new Date(req.query.dateFinal)
            });

            res.status(201).send('Actualizado');
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }

    },

    statusActivity: async (req, res, next, validationResult) => {
        try {
            var act = await alumActivity.findOneAndUpdate({
                $or: [{
                    id_activity: req.query.id_activity
                }, {
                    id_estudiante: req.query.id_estudiante
                }]
            }, {
                estado: req.query.estado
            });

            res.status(201).send('estado actualizado ' + req.query.estado);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }

    },
    NotaActivity: async (req, res, next, validationResult) => {
        try {
            var act = await alumActivity.findOneAndUpdate({
                $or: [{
                    id_activity: req.query.id_activity
                }, {
                    id_estudiante: req.query.id_estudiante
                }]
            }, {
                nota: req.query.nota
            });

            res.status(201).send('nota actualizada ' + req.query.estado);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }

    },
    notasUpdate: async (req, res, next, validationResult) => {
        var nt = new notas({
            pparcial: req.query.pparcial || 0,
            sparcial: req.query.sparcial || 0,
            efinal: req.query.efinal || 0,
            actividades: req.query.actividades || 0,
        })
        try {
            var act = await notas.findOneAndUpdate({
                id_estudiante: req.query.id_estudiante
            }, {

            });

            res.status(201).send('nota actualizada ' + req.query.estado);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }

    },
}