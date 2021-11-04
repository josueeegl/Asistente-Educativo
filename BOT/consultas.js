const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
const {
    update_bot,
    verificar_codigo
} = require('./funciones');

var mensaje = '';
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
        ctx.reply(`${apartado}\nTitulo:  ${data.nombre}\n\nInstrucciones: ${data.descripcion}\n\nVencimiento: ${data.dateFinal}\n\nEstado: ${estado} \n ${apartado}`)
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
            ctx.reply(`Notas actuales:\n\nCurso: ${item.curso}\nParcial #1: ${data.pparcial}\nParcial #2: ${data.sparcial}\nActividades: ${data.actividades}\nExamen final: ${data.efinal}\nNota final: ${parseInt(data.pparcial) + parseInt(data.sparcial) + parseInt(data.actividades) + parseInt(data.efinal)}`);
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
                        cxt.reply(`El codigo no coincide.`);
                    } else {
                        await update_bot(val._id, cxt.from.id).then(x => {
                            if (x) {
                                cxt.reply(`Hola, ${val.nombres} ${val.apellidos} has sido registrado exitosamente!\nCorreo: ${val.correo}\nCarné: ${val.id_estudiante}\nSeccion: ${val.seccion}\n\nComandos:\n/miscursos\n/actividades\n/notas`);
                            } else {
                                cxt.reply(`Hubo un problema al registrar :(`);
                            }
                        });
                    }
                });
            } else {
                cxt.reply(`Tu codigo no es valido, intenta de nuevo.\n/menu`);
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
            else {
                ctx.reply(mensaje);
                mensaje = '❌📑Actualmente no estas Inscrito en ningun Curso';
                
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