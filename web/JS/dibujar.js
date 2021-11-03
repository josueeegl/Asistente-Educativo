const div = document.getElementById('cursos');
const divActis = document.getElementById('actis');
const actxAlumnos = document.getElementById('actxAlumnos');
const crear_cursos = (item) => {
  var html = '';

  html += `<p class="txtCurso" id="${item._id}" onClick="cargar_datos()">${item.curso}</p>`;
  div.innerHTML += html;
}
const dibujar_alumnos = (item, id_curso) => {
  var html = '';
  html = ` 
  <tr>
    <td>${item.nombre}</td>
    <td><input id="${item.id_alumno}_1_${id_curso}" class="input_notas" onchange="aplicar_cambios()" type="text" value="${item.pparcial}" /></td>
    <td><input id="${item.id_alumno}_2_${id_curso}" class="input_notas" onchange="aplicar_cambios()" type="text" value="${item.sparcial}" /></td>
    <td><input id="${item.id_alumno}_3_${id_curso}" class="input_notas" onchange="aplicar_cambios()" type="text" value="${item.actividades}" /></td>
    <td><input id="${item.id_alumno}_4_${id_curso}" class="input_notas" onchange="aplicar_cambios()" type="text" value="${item.efinal}" /></td>
    <td>${parseInt(item.pparcial) + parseInt(item.sparcial) + parseInt(item.actividades) + parseInt(item.efinal)}</td>
  </tr>`;

  document.getElementById('tabla').innerHTML += html;

}

const dibujar_actividades = (data) => {
  var html = '';
  data.forEach((item) => {
    html += `<div class="actis2" id="${item._id}" onclick="actividadesxAlumnos(this.id)">
    <p>${item.nombre}</p>
    <p>Vencimiento:</p>
    <p><input type="text" value="${item.dateFinal}" id="${item._id.toString()}" onchange="update_actividad()"/></p>
  </div>`
  });
  divActis.innerHTML = html;
}

const dibujar_actividadesxalum = (data, item) => {
  var html = '';
    html += `<div class="tareas_alum">
    <p >${data.nombres} ${data.apellidos}</p>
    <p >${item.estado}</p>
    <input type="text" value="${item.nota}" onchange="update_nota(this.id, this.value)" id="${item._id}"/>
</div>`;
  actxAlumnos.innerHTML += html;
}