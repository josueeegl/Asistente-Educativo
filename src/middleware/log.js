const jwt = require("jsonwebtoken");



module.exports = {

    verificarToken: async (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send("Se requiere un token para autenticar");
        }

        try {
            jwt.verify(token, 'clavesecreta');
        } catch (err) {
            return res.status(401).send("Token Chafa");
        }
        next();
    }
}