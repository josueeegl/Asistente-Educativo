const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
module.exports = {
    update_codigo: async (correo, codigo) => {
        var resul = false;
        await fetch('http://localhost:3000/api/alumno?' + new URLSearchParams({
            correo: correo,
            codigo: codigo
        }), {
            method: 'PUT',
        }).then(res => res.json()).then(data => {
            if (data == 'Actualizado') {
                resul = true;

            } else {
                resul = false;
            }
        });
        return resul;
    },
    update_bot: async (id, idbot) => {
        var resul = false;
        await fetch('http://localhost:3000/api/alumno?' + new URLSearchParams({
            id_bot: idbot,
            _id: id
        }), {
            method: 'PUT',
        }).then(res => res.json()).then(data => {
            if (data == 'Actualizado') {
                resul = true;

            } else {
                resul = false;
            }
        });
        return resul;
    },
    verificar_id: async (id) => {
        var resul = false;
        await fetch('http://localhost:3000/api/buscaralumno?' + new URLSearchParams({
            id_bot: id
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            if (data == 'no he encontrado') {
                resul = false;

            } else {
                resul = true;
            }
        });
        return resul;
    },
    verificar_codigo: async (codigo) => {
        var resul;
        await fetch('http://localhost:3000/api/buscaralumno?' + new URLSearchParams({
            codigo: codigo
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            if (data == 'no he encontrado') {
                resul = 'x';

            } else {
                resul = data;
            }
        });
        return resul;
    }
}