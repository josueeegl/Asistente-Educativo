const token_bot = '2057364503:AAE7jZA3C946fjFheS5aK5Rd_6G6LWKVjPs';
const {
    Telegraf
} = require('telegraf');
const bot = new Telegraf(token_bot);
const {
    verificar_id, verificar_codigo
} = require('./verificar');
const {
    enviar_correo,
    generateRandomString
} = require('./correo');
const {
    update_codigo, update_bot
} = require('./funciones');


bot.start((cxt) => {
    verificar_id(cxt.from.id).then(async val => {
        if (val) {
            cxt.reply(`Hola ${cxt.from.first_name}!`);
        } else {
           await cxt.reply(`Bienvenido ${cxt.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            cxt.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});

bot.email(new RegExp('([a-zA-Z0-9]\@miumg\.edu\.gt)'), async (cxt) => {
    var cd = generateRandomString();
    await update_codigo(cxt.message.text, cd + '/'+ cxt.from.id).then(async val => {
        if (val) {
            await enviar_correo(cxt.message.text, cd + '/'+ cxt.from.id);
            cxt.reply(`Verifica el correo enviado a ${cxt.message.text}`);
        } else {
            cxt.reply(`El correo ${cxt.message.text} no esta registrado, comunicate con tu profesor`);
        }
    });
});

bot.on('text', async cxt =>{
    var recibido = cxt.message.text;
    var palabras = recibido.split(' ');
    var id = palabras[1].split('/')[1];
    if(palabras[0].toLowerCase() == 'pin'){
        if(cxt.from.id == id){
            await verificar_codigo(palabras[1]).then(async val => {
                if (val == 'x') {
                    cxt.reply(`El codigo no coincide.`);
                } else {

                    await update_bot(val._id, cxt.from.id).then(x => {
                        if(x){
                            cxt.reply(`Hola, ${val.nombres} ${val.apellidos} has sido registrado exitosamente!\n
                            Correo: ${val.correo} \n
                            ID de la U: ${val.id_estudiante}\n
                            Seccion: ${val.seccion}\n\nComandos:\n/menu`);
                        }else{
                            xt.reply(`Hubo un problema al registrar :(`);
                        }
                    });   
                }
            });
        }else{
            cxt.reply(`Tu codigo no es valido, intenta de nuevo.\n/menu`);
        }
    }
})
module.exports = bot.launch();