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
                dateFinal: req.query.dateFinal,
                dateInicial: req.query.dateInicial,
            });
            await act.save();

            await alumno.find({
                'cursos.id_curso': req.query.id_curso
            }, function (err, person) {
                person.forEach(item => {
                    var alacti = alumActivity({
                        id_estudiante: item._id.toString(),
                        id_activity: act._id.toString(),
                        estado: 'ACTIVO',
                        
                    })
                    alacti.save();
                })
            }).clone();


            res.status(201).send(JSON.stringify('Tarea publicada'));
        } catch (err) {
            res.status(404).send(JSON.stringify(err));
            console.log(err);
        }

    },

    // GET 
    getActivityCurso: async (req, res, next, validationResult) => {
        try {
            
            var act = await activities.find({
                    id_curso: req.query.id_curso,
                    id_profe: req.query.id_profe
            });
            res.status(200).send(act);
        } catch (err) {
            res.status(404).send(JSON.stringify('No Hay'));
        }
    },

    //PUT
    updateActivity: async (req, res, next, validationResult) => {
        try {
            
            await activities.findOneAndUpdate({
                _id: req.query.id_activity
            }, {
                dateFinal: req.query.dateFinal
            });

            res.status(201).send(JSON.stringify('Actualizado'));
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
            await alumActivity.findOneAndUpdate({
                    _id: req.query.id
            }, {
                nota: req.query.nota
            });
            res.status(201).send(JSON.stringify('nota actualizada'));
        } catch (err) {
            res.status(404).send(JSON.stringify(err));
            console.log(err);
        }

    },
    notasUpdate: async (req, res, next, validationResult) => {
       
        try {
            var act = await notas.findOneAndUpdate({
                id_estudiante: req.query.id_estudiante,
                id_curso: req.query.id_curso
            }, {
                pparcial: req.query.pparcial || 0,
                sparcial: req.query.sparcial || 0,
                efinal: req.query.efinal || 0,
                actividades: req.query.actividades || 0
            });

            res.status(201).send(JSON.stringify('nota actualizada'));
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }

    },
}