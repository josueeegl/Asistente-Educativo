const alumno = require('../models/alumno');
const profers = require('../models/profesor');
const curso = require('../models/curso');

module.exports = {
    //La funcion index se ejecuta cuanado 
    alumnosCursos: async (req, res, next, validationResult) => {
        try {
            var idcurso = await curso.findOne({
                curso: req.query.curso
            });

            var alumnos = await alumno.findOne({
                'cursos.id_curso': idcurso._id.toString()
            });

            console.log(idcurso._id.toString())
            console.log(alumnos)
            res.status(200).send(alumnos);
        } catch (err) {
            console.log(err);
        }
    }
}