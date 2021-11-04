//Requerimos el paquete
var nodemailer = require('nodemailer');


module.exports = {
    enviar_correo: async (dest, codigo) => {
        //Creamos el objeto de transporte
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'progra1pruebas@gmail.com',
                pass: 'PROGRA852963741'
            }
        });

        var mensaje = `Hola! Como ultimo paso para verificar tu correo debes enviar al bot de telegram la palabra PIN seguido de ${codigo}
        \nEjemplo: \npin ${codigo}`;

        var mailOptions = {
            from: 'progra1pruebas@gmail.com',
            to: dest,
            subject: 'Verificación',
            text: mensaje
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    },
    generateRandomString: (num) => {
        let result1 = Math.random().toString(36).substring(0, num);
        return result1;
    }
}