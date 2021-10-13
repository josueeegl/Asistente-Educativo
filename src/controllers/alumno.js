const alumno = require('../models/alumno');

module.exports = {
    //La funcion index se ejecuta cuanado 
    index: async (req, res, next, validationResult) => {
        try {
            const alumnos = await alumno.find({});
            res.status(200).send(alumnos);
        } catch (err) {
            console.log(err);
        }
    },

    newAlumno: async (req, res, next, validationResult) => {
        try {

        } catch (err) {

        }
    }

}