const decoder = new TextDecoder();
const token = document.getElementById('token').innerHTML;
const encoder = new TextEncoder();
csvFileInput = document.getElementById('FileCSV');
document.getElementById('EnviarCSV').addEventListener("click", (e) => {
    Papa.parse(csvFileInput.files[0], {
        delimiter: ";",
        skipEmptyLines: true,
        complete: datos
    })
});

function datos(result) {
    var data = result.data;
    for (let i = 1; i < data.length; i++) {
        insertar(data[i]);
    }
}

const insertar = (data) => {

    fetch('/api/alumnos?' + new URLSearchParams({
        nombre: data[1],
        apellido: data[0],
        correo: data[2],
        id_estudiante: data[3],
        curso: data[4],
        seccion: data[5],
        token: token
    }), {
        method: 'POST',
    }).then(res => res.json()).then(data => {
        console.log(data);
    });
}