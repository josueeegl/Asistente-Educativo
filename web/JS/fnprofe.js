const correo = document.getElementById('correo').innerHTML;

fetch('/api/profe/cursos?' + new URLSearchParams({
    correo: correo,
    token: token
}), {
    method: 'GET',
}).then(res => res.json()).then(data => {
    obtener_cursos(data);
});
const obtener_cursos = (data) => {
    document.getElementById('IDprofe').innerHTML = data._id;
    data.cursos.forEach(item => {
        fetch('/api/buscarcursoID?' + new URLSearchParams({
            id_curso: item.id_curso
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            crear_cursos(data);
        });
    });
}

const cargar_datos = (id) => {
    var id_curso = event.srcElement.id;
    document.getElementById('cursoSeleccionado').innerHTML = id_curso;
    document.getElementById('actxAlumnos').style.display = 'none';
    fetch('/api/alumCursos?' + new URLSearchParams({
        id_curso: id_curso
    }), {
        method: 'GET',
    }).then(res => res.json()).then(data => {
        document.getElementById('tabla').innerHTML = `<tr>
        <th>Nombre</th>
        <th>P#1</th>
        <th>P#2</th>
        <th>Actividades</th>
        <th>Final</th>
        <th>Nota</th>
      </tr>`;
        document.getElementById('tabla_alumnos').style.display = 'block';
        document.getElementById('actividadesxcurso').style.display = 'block';
        obtener_nota(data, id_curso);
        obtener_actividades();
    }).catch(err => {
        console.log(err);
    });
}

const obtener_nota = (data, id_curso) => {

    data.forEach(item => {
        fetch('/api/alumNotas?' + new URLSearchParams({
            id_estudiante: item._id.toString(),
            nombre: `${item.nombres} ${item.apellidos}`
        }), {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            dibujar_alumnos(data, id_curso);
        })
    })
}

const aplicar_cambios = () => {
    const id_curso = event.srcElement.id;
    var ids = id_curso.split('_');

    fetch('/api/calificacion/notas?' + new URLSearchParams({
        id_estudiante: ids[0],
        id_curso: ids[2],
        pparcial: document.getElementById(`${ids[0]}_1_${ids[2]}`).value,
        sparcial: document.getElementById(`${ids[0]}_2_${ids[2]}`).value,
        efinal: document.getElementById(`${ids[0]}_4_${ids[2]}`).value,
        actividades: document.getElementById(`${ids[0]}_3_${ids[2]}`).value,
        token: token
    }), {
        method: 'PUT'
    }).then(res => res.json()).then(data => {
        document.getElementById(ids[2]).click();
    })
}