const correo = document.getElementById('correo').innerHTML;
const div = document.getElementById('cursos');
fetch('/api/profe/cursos?' + new URLSearchParams({
    correo: correo,
    token: token
}), {
    method: 'GET',
}).then(res => res.json()).then(data => {
    crear_cursos(data);
});

const crear_cursos = (data) => {
    var html = '';

    data.forEach(item => {
        html += `<p class="txtCurso" id="${item.id_curso}" onClick="cargar_datos()">${item.curso}</p>`;
    })
    div.innerHTML = html;
}

const cargar_datos = () => {
    const id_curso = event.srcElement.id;
    alert(id_curso);
}