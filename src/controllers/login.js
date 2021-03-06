const profes = require('../models/profesor');
const alumno = require('../models/alumno');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const url = require('url');

module.exports = {

    logProf: async (req, res) => {
        try {
            const prof = await profes.findOne({
                correo: req.body.user
            });
            if (prof && (await bcrypt.compare(req.body.password, prof.password))) {
                const user = {
                    id: prof._id.toString(),
                    correo: prof.correo,
                    nombre: prof.nombres
                }

                const token = jwt.sign({
                    user: user
                }, 'clavesecreta', {
                    expiresIn: "2h",
                });
                prof.token = token;
                res.status(200).render('profe.html', {
                    data: prof
                });
                return;
            }

            res.status(400).redirect(url.format({
                pathname: '/',
                query: {
                    'data': 'ERROR'
                }
            }));

        } catch (err) {
            res.send(err);

        }
    },
    logAlum: async (req, res) => {
        try {
            const users = await alumno.findOne({
                correo: req.query.correo
            });
            if (prof && (await bcrypt.compare(req.query.password, users.password))) {
                const user = {
                    id: prof._id.toString(),
                    correo: users.correo,
                    nombre: users.nombres
                }

                const token = jwt.sign({
                    user: user
                }, 'clavesecreta');
                users.token = token;
                res.status(200).send(users);
                return;
            }
            res.status(400).send('Datos incorrectos');

        } catch (err) {
            res.send(err);

        }
    }

}