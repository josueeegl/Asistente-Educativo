const token_bot = '2057364503:AAE7jZA3C946fjFheS5aK5Rd_6G6LWKVjPs';
const {
    Telegraf
} = require('telegraf');
const bot = new Telegraf(token_bot);

const {
    enviar_correo,
    generateRandomString
} = require('./correo');
const {
    update_codigo,
    verificar_id
} = require('./funciones');
const {
    validando_pin, obtener_cursos, obtener_actividades, obtener_notas
} = require('./consultas.js');


bot.start((cxt) => {
    verificar_id(cxt.from.id).then(async val => {
        if (val) {
            
            sendStarMessage(cxt); // llama funcion enviar botones
        } else {
            await cxt.reply(`Bienvenido ${cxt.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            cxt.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});

bot.email(new RegExp('([a-zA-Z0-9]\@miumg\.edu\.gt)'), async (cxt) => {
    var cd = generateRandomString();
    await update_codigo(cxt.message.text, cd + '/' + cxt.from.id).then(async val => {
        if (val) {
            await enviar_correo(cxt.message.text, cd + '/' + cxt.from.id);
            cxt.reply(`Verifica el correo enviado a ${cxt.message.text}`);
        } else {
            cxt.reply(`El correo ${cxt.message.text} no esta registrado, comunicate con tu profesor`);
        }
    });
});

bot.action('miscursos', (ctx) => {
    ctx.answerCbQuery();
    verificar_id(ctx.from.id).then(async val => {
        if (val) {
            obtener_cursos(ctx);
        } else {
            await ctx.reply(`Bienvenido ${ctx.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            ctx.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});

bot.action('actividades', (ctx) => {
    verificar_id(ctx.from.id).then(async val => {
        if (val) {
            obtener_actividades(ctx);
        } else {
            await ctx.reply(`Bienvenido ${ctx.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            ctx.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});
bot.action('notas', (ctx) => {
    verificar_id(ctx.from.id).then(async val => {
        if (val) {
            obtener_notas(ctx);
        } else {
            await ctx.reply(`Bienvenido ${ctx.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            ctx.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
        }
    });
});

bot.on('text', async cxt => {
    verificar_id(cxt.from.id).then(async val => {
        if (val) {
            
            sendStarMessage(cxt);
        } else {
            var recibido = cxt.message.text.toLowerCase();
            if (recibido.startsWith('pin')) {
                validando_pin(recibido, cxt);
            } else {
                await cxt.reply(`Bienvenido ${cxt.from.first_name}! \nYo seré tu asistente de educación virtual. \nPrimero debemos verificar tu correo electronico de la \nuniversidad.`);
            cxt.reply(`Escribe tu correo electronico\nEjemplo: \nmibot@miumg.edu.gt`);
            }
        }
    });

});





function sendStarMessage(ctx) {
    const starMessage = "👋 Bienbenido a tu asistente personal, " + ctx.from.first_name + "👏 \n\nSelecciona la consulta que deseas verificar 👇";

    bot.telegram.sendMessage(ctx.chat.id, starMessage,{
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "📚📖  Cursos",
                    callback_data: 'miscursos'
                }],
                [{
                    text: "📆📃  Actividades",
                    callback_data: 'actividades'
                }],
                [{
                    text: "📊📝  Notas",
                    callback_data: 'notas'
                }]

            ]

        }
    })

}









module.exports = bot.launch();