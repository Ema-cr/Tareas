let formularioTarea = document.getElementById("formulario-tarea");
let descripcionInput = document.getElementById("descripcion");
let completadaCheckbox = document.getElementById("completadaCheckbox");
let listaTareas = document.getElementById("lista-tareas");

let tareas = [
  { descripcion: "Cocinar", completada: false },
  { descripcion: "Lavar", completada: true },
  { descripcion: "Barrer", completada: false },
];

function renderizarTareas() {
  let realized = tareas.map((tarea, i) => {
    let icono = tarea.completada ? "✅" : "❌";
    let estilo = tarea.completada
      ? 'style="background-color: #d4edda; padding: 10px; border-radius: 5px;"'
      : 'style="background-color: #f8d7da; padding: 10px; border-radius: 5px;"';
    if (tarea.completada) {
      return `<div ${estilo}><p>${icono} ${tarea.descripcion}</p></div>`;
    } else {
      return `<div ${estilo}><p>${icono} ${tarea.descripcion}</p><button onclick="cambiarBoton(${i})">Completar</button></div>`;
    }
  });
  listaTareas.innerHTML = realized.join("");
}

// Mostrar tareas iniciales
renderizarTareas();

function manejarFormulario() {
  formularioTarea.addEventListener("submit", (e) => {
    e.preventDefault();

    const descripcion = descripcionInput.value.trim();
    const completada = completadaCheckbox.checked;

    if (descripcion === "") return;

    const existeTarea = tareas.some(
      (t) => t.descripcion.toLowerCase() === descripcion.toLowerCase()
    );
    if (existeTarea) {
      alert("Ya existe una tarea con esa descripción.");
      return;
    }

    tareas.push({
      descripcion: descripcion,
      completada: completada,
    });

    // Limpiar formulario
    descripcionInput.value = "";
    completadaCheckbox.checked = false;
    console.log = tareas;

    renderizarTareas();
  });
}

function cambiarBoton(i) {
  tareas[i].completada = true;
  renderizarTareas();
}

manejarFormulario();
