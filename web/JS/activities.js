document.getElementById('btnActi').addEventListener('click', () => {
    var div = document.getElementById('divActivity');
    if (div.style.display === 'block') {
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }
});
document.getElementById('btnCancelar').addEventListener('click', () => {
    document.getElementById('divActivity').style.display = 'none';
});

const nuevaActivity = () => {
    var cursoID = document.getElementById('cursoSeleccionado').innerHTML;
    var profeID = document.getElementById('IDprofe').innerHTML;
    var title = document.getElementById('acTitle').value,
        fI = document.getElementById('acFI').value,
        FF = document.getElementById('acFF').value,
        descrio = document.getElementById('acDescrip').value;
    fetch('/api/activity/nueva?' + new URLSearchParams({
        id_curso: cursoID,
        id_profe: profeID,
        nombre: title,
        descripcion: descrio,
        dateFinal: FF,
        dateInicial: fI,
    }), {
        method: 'POST',
    }).then(res => res.json()).then(data => {
        console.log(data);
        alert(data);
        document.getElementById('divActivity').style.display = 'none';
    });

}

document.getElementById('btnEnviar').addEventListener('click', () => {
    nuevaActivity();
    var idcurso = document.getElementById('cursoSeleccionado').innerHTML;
    document.getElementById(idcurso).click();

});

const obtener_actividades = () => {
    var cursoID = document.getElementById('cursoSeleccionado').innerHTML;
    var profeID = document.getElementById('IDprofe').innerHTML;
    fetch('/api/activity/obtener?' + new URLSearchParams({
        id_curso: cursoID,
        id_profe: profeID
    }), {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        dibujar_actividades(data);
    });
}
const update_actividad = () => {
    var id_act = event.srcElement.id;
    var valor = event.srcElement.value;
    var idcurso = document.getElementById('cursoSeleccionado').innerHTML;
    fetch('/api/activity/update?' + new URLSearchParams({
        dateFinal: valor,
        id_activity: id_act,
    }), {
        method: 'PUT',
    }).then(res => res.json()).then(data => {
        document.getElementById(idcurso).click();
    });
}

const actividadesxAlumnos = (id) => {
    document.getElementById('actxAlumnos').innerHTML = '';
    document.getElementById('actxAlumnos').style.display = 'flex';

    fetch('/api/alumActi?' + new URLSearchParams({
        id_activity: id
    }), {
        method: 'GET',
    }).then(res => res.json()).then(data => {
        obtener_actAlumnos(data);
    });
}

const obtener_actAlumnos = (data) => {
    data.forEach(item => {
        fetch('/api/buscaralumno?' + new URLSearchParams({
            id_estudiante: item.id_estudiante,
        }), {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            dibujar_actividadesxalum(data, item);
            window.scroll(0, 400);
        });
    });
}

const update_nota = (id, value) => {
    fetch('/api/activity/nota?' + new URLSearchParams({
        id: id,
        nota: value
    }), {
        method: 'PUT',
    }).then(res => res.json()).then(data => {
        console.log(data);
        var idcurso = document.getElementById('cursoSeleccionado').innerHTML;
        document.getElementById(idcurso).click();
    });
}