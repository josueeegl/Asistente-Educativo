const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
const {
    update_bot,
    verificar_codigo
} = require('./funciones');

var mensaje = '✅ Cursos actualmente Inscrito 📚 \n';
var x = 0;
const buscar_cursos = async (id, ctx) => {
    try {
        fetch('http://localhost:3000/api/buscarcursoID?' + new URLSearchParams({
            id_curso: id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            mensaje += `\n- ${data.curso}`;
        });
    } catch (e) {
        console.log(e.message);
    }
}

const buscar_actis = async (id, ctx) => {
    fetch('http://localhost:3000/api/alumActi?' + new URLSearchParams({
        id_estudiante: id
    }), {
        method: 'GET',
    }).then(res => res.json()).then(data => {
        data.forEach((item) => {
            actividades(item.id_activity, item.estado, ctx);
        });
    });
}

var apartado="- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -";

const actividades = async (id, estado, ctx) => {
    fetch('http://localhost:3000/api/activity/buscar?' + new URLSearchParams({ 
        id: id, 
    }),{
        method: 'GET',
    }).then(res => res.json()).then(data => {
        ctx.reply(`${apartado}\n📝Titulo:  ${data.nombre}\n\n💬Instrucciones: ${data.descripcion}\n\n📅Vencimiento: ${data.dateFinal}\n\n📍Estado: ${estado} \n ${apartado}`)
    });
}

const buscar_notas = async (data, ctx) => {
    fetch('http://localhost:3000/api/alumNotas?' + new URLSearchParams({
        id_estudiante: data._id,
        nombre: data.nombres,
    }), {
        method: 'GET',
    }).then(res => res.json()).then(item => {
        notas_curso(item, ctx);
    });
}

const notas_curso = async (data, ctx) => {
    try {
        fetch('http://localhost:3000/api/buscarcursoID?' + new URLSearchParams({
            id_curso: data.id_curso
        }), {
            method: 'GET',
        }).then(res => res.json()).then(item => {
            ctx.reply(`${apartado}\n     📈📑 NOTAS ACTUALES 🔖\n${apartado}\n\n📕 Curso: ${item.curso}\n📃 Parcial #1: ${data.pparcial}\n📃 Parcial #2: ${data.sparcial}\n📋 Actividades: ${data.actividades}\n📃Examen final: ${data.efinal}\n\n\n🚨 Nota final 👉 ${parseInt(data.pparcial) + parseInt(data.sparcial) + parseInt(data.actividades) + parseInt(data.efinal)}\n${apartado}`);
        });
    } catch (e) {
        console.log(e.message);
    }
}
module.exports = {

    validando_pin: async (recibido, cxt) => {
        var palabras = recibido.split(' ');
        var id = palabras[1].split('/')[1];
        if (palabras[0] == 'pin') {
            if (cxt.from.id == id) {
                await verificar_codigo(palabras[1]).then(async val => {
                    if (val == 'x') {
                        cxt.reply(`🔐🔔El codigo no coincide.`);
                    } else {
                        await update_bot(val._id, cxt.from.id).then(x => {
                            if (x) {

                                cxt.reply(`👋 Hola, ${val.nombres} ${val.apellidos} has sido Verificado exitosamente!✅\n📌Correo: ${val.correo}\n📌Carné: ${val.id_estudiante}\n📌Seccion: ${val.seccion}\n`);
                                sendStarMessagee(cxt);
                            } else {
                                cxt.reply(`⛔⚠Hubo un problema al registrar :(`);
                            }
                        });
                    }
                });
            } else {
                cxt.reply(`⛔⚠Tu codigo no es valido, intenta de nuevo.\n/menu`);
            }
        }
    },

    obtener_cursos: async (ctx) => {
        fetch('http://localhost:3000/api/buscaralumno?' + new URLSearchParams({
            id_bot: ctx.from.id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(async data => {
            data.cursos.forEach(async item => {
                await buscar_cursos(item.id_curso, ctx);
                x++;
            });
            if (x > 0) {
                ctx.reply(mensaje);
                mensaje = '✅ Cursos actualmente Inscrito 📚 \n';
                x = 0;
            }
        });
    },
    obtener_actividades: async (ctx) => {
        ctx.reply('📅  Actividades y tareas programadas:')
        fetch('http://localhost:3000/api/buscaralumno?' + new URLSearchParams({
            id_bot: ctx.from.id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            
            buscar_actis(data._id, ctx);
        });
    },
    obtener_notas: async (ctx) => {
        fetch('http://localhost:3000/api/buscaralumno?' + new URLSearchParams({
            id_bot: ctx.from.id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            
            buscar_notas(data, ctx);
        });
    }
}



function sendStarMessagee(ctx) {
    const starMessage = "👋 Bienvenido a tu asistente personal, " + ctx.from.first_name + "👏 \n\nSelecciona la consulta que deseas verificar 👇";

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