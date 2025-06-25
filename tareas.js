let formularioTarea = document.getElementById('formulario-tarea');
let descripcionInput = document.getElementById('descripcion');
let completadaCheckbox = document.getElementById('completadaCheckbox');
let listaTareas = document.getElementById('lista-tareas');

let tareas = [
    { descripcion: "Cocinar", completada: false },
    { descripcion: "Lavar", completada: true },
    { descripcion: "Barrer", completada: false }
];

function renderizarTareas() {
    let realized = tareas.map((tarea) => {
        let icono = tarea.completada ? "✅" : "❌";
        return `<p>${icono} ${tarea.descripcion}</p>`;
    });
    listaTareas.innerHTML = realized.join("");
}

// Mostrar tareas iniciales
renderizarTareas();

formularioTarea.addEventListener('submit', e => {
    e.preventDefault();

    const descripcion = descripcionInput.value.trim();
    const completada = completadaCheckbox.checked;

    if (descripcion === "") return;

    tareas.push({
        descripcion: descripcion,
        completada: completada,
    });

    // Limpiar formulario
    descripcionInput.value = "";
    completadaCheckbox.checked = false;
    console.log=(tareas)

    renderizarTareas();
});
