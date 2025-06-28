const productos = {
  1: { id: 1, nombre: "laptop", precio: 3000, categoria: "electronica" },
  2: { id: 2, nombre: "teclado", precio: 1500, categoria: "accesorios" },
  3: { id: 3, nombre: "mouse", precio: 500, categoria: "accesorios" },
};

console.log("Productos iniciales:", productos);

// Crear Set de nombres (evita duplicados)
const setProductos = new Set(
  Object.values(productos).map((p) => p.nombre.toLowerCase())
);
console.log("Set de nombres únicos:", setProductos);

// Crear Map de categorías
const mapProductos = new Map([
  ["electronica", "laptop"],
  ["accesorios", "mouse"],
  ["accesorios", "teclado"], // Esta línea sobrescribirá la anterior
]);

console.log("Map de categorías:");
mapProductos.forEach((producto, categoria) => {
  console.log(`Categoría: ${categoria}, Producto: ${producto}`);
});

// Mostrar contenido inicial
for (const id in productos) {
  console.log(`Producto ID: ${id}, Detalles:`, productos[id]);
}
for (const producto of setProductos) {
  console.log("Producto único:", producto);
}

// DOM
let formularioIngresar = document.getElementById("formularioIngresar");
let nombreInput = document.getElementById("nombre");
let precioInput = document.getElementById("precio");
let categoriaInput = document.getElementById("categoria");
let listaProductos = document.getElementById("lista-productos");

let formularioBuscar = document.getElementById("formularioBuscar");
let busquedaInput = document.getElementById("busqueda");

// Inicializar IDs automáticos
let nextId = Object.keys(productos).length + 1; // clave del objeto
let nextInternalId = 4; // id interno visible

// Renderiza productos (solo si la lista NO está vacía)
function renderizarProductos(lista) {
  listaProductos.innerHTML = "";

  if (lista.length === 0) return;

  lista.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto-item");
    div.innerHTML = `
      <p><strong>${producto.nombre}</strong></p>
      <p>ID interno: ${producto.id}</p>
      <p>Precio: $${producto.precio}</p>
      <p>Categoría: ${producto.categoria}</p>
    `;
    listaProductos.appendChild(div);
  });
}

// Agregar nuevo producto al objeto
formularioIngresar.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const precio = parseFloat(precioInput.value);
  const categoria = categoriaInput.value.trim();

  if (nombre === "" || isNaN(precio) || categoria === "") {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  const yaExiste = Object.values(productos).some(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (yaExiste) {
    alert("Ese producto ya fue ingresado.");
    return;
  }

  // Agregar producto al objeto productos
  productos[nextId] = {
    id: nextInternalId,
    nombre,
    precio,
    categoria,
  };

  console.log("Producto agregado:", productos[nextId]);

  nextId++;
  nextInternalId++;

  // Limpiar formulario
  nombreInput.value = "";
  precioInput.value = "";
  categoriaInput.value = "";

  // No mostrar nada automáticamente
});

// Buscar productos por nombre o categoría
formularioBuscar.addEventListener("submit", (e) => {
  e.preventDefault();

  const termino = busquedaInput.value.trim().toLowerCase();

  if (termino === "") {
    listaProductos.innerHTML = "";
    return;
  }

  const resultados = Object.values(productos).filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(termino) ||
      producto.categoria.toLowerCase().includes(termino)
  );

  console.log("Resultados de búsqueda:", resultados);

  renderizarProductos(resultados);
});

