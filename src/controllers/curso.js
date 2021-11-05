const curso = require('../models/curso');

module.exports = {

    // Ingresar un curso
    aggCurso: async (req, res, next, validationResult) => {
        try {
            var cur = new curso({
                curso: req.query.curso.toLowerCase(),
            })
            await cur.save();
            res.status(201).send(cur);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },
    // Buscar cursos
    BuscarCurso: async (req, res, next, validationResult) => {
        try {
            var cur = await curso.find({
                curso: {
                    $regex: new RegExp(`.*${req.query.curso}.*`)
                }
            });

            res.status(200).send(cur);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },

    BuscarCursoID: async (req, res, next, validationResult) => {
        try {
            var cur = await curso.findOne({
                _id: req.query.id_curso
            });

            res.status(200).send(cur);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },
    // Buscar cursos
    obtenerCursos: async (req, res, next, validationResult) => {
        try {
            var cur = await curso.find({});
            res.status(200).send(cur);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },
    // eliminar curso
    EliminarCurso: async (req, res, next, validationResult) => {
        try {
            var cur = await curso.findOneAndDelete({
                $or: [{
                    _id: req.query.id_curso
                }, {
                    curso: req.query.curso.toLowerCase()
                }]

            });

            res.status(200).send(`${cur.curso} eliminado`);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },
    // actualizar curso
    updateCurso: async (req, res, next, validationResult) => {
        try {
            await curso.findOneAndUpdate({
                _id: req.query.id_curso
            }, {
                curso: req.query.curso
            });

            res.status(200).send(`Actualizado`);
        } catch (err) {
            res.status(404).send(err);
            console.log(err);
        }
    },
}