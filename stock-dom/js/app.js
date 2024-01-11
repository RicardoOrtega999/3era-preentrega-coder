const htmlElements = {
  formProducto: document.querySelector("#formProducto"),
  inputNombre: document.querySelector("#inputNombre"),
  inputColor: document.querySelector("#inputColor"),
  inputTalla: document.querySelector("#inputTalla"),
  inputCantidad: document.querySelector("#inputCantidad"),
  inventarioContenedor: document.querySelector("#inventarioContenedor"),
  filtroInventario: document.querySelector("#filtroInventario"),
  tipoProducto: document.querySelector("#tipoProducto"),
};

// Función para seleccionar el tipo de producto
function seleccionarTipoProducto(tipo) {
  htmlElements.tipoProducto.value = tipo;
}

let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

// Función para mostrar los productos en el contenedor de inventario
const mostrarInventario = (inventario) => {
  htmlElements.inventarioContenedor.innerHTML = "";

  inventario.forEach((producto) => {
    let tarjeta = document.createElement("div");
    tarjeta.className = "card mb-3";
    tarjeta.innerHTML = `<div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">
                                    Tipo: ${producto.tipo} | 
                                    Color: ${producto.color || "N/A"} | 
                                    Talla: ${producto.talla || "N/A"} | 
                                    Cantidad: ${producto.cantidad}
                                </p>
                                <button class="btn btn-danger" onclick="eliminarProducto(${
                                  producto.id
                                })">Eliminar</button>
                            </div>`;

    htmlElements.inventarioContenedor.appendChild(tarjeta);
  });
};

// Función para agregar un nuevo producto al inventario
const agregarProducto = () => {
  let tipoProducto = htmlElements.tipoProducto.value;
  let nombre = htmlElements.inputNombre.value;
  let color = htmlElements.inputColor.value;
  let talla = htmlElements.inputTalla.value;
  let cantidad = parseInt(htmlElements.inputCantidad.value);

  let productoNuevo = crearProducto(
    tipoProducto,
    nombre,
    color,
    talla,
    cantidad
  );
  inventario.push(productoNuevo);
  localStorage.setItem("inventario", JSON.stringify(inventario));
  mostrarInventario(inventario);
};

// Función para eliminar un producto del inventario
const eliminarProducto = (idProducto) => {
  inventario = inventario.filter((producto) => producto.id !== idProducto);
  localStorage.setItem("inventario", JSON.stringify(inventario));
  mostrarInventario(inventario);
};

// Función para filtrar productos en el inventario por tipo
const filtrarInventario = (tipo) => {
  let productosFiltrados = inventario.filter(
    (producto) => producto.tipo.toLowerCase() === tipo.toLowerCase()
  );
  mostrarInventario(productosFiltrados);
};

htmlElements.formProducto.onsubmit = (event) => {
  event.preventDefault();
  agregarProducto();
};

htmlElements.filtroInventario.oninput = () => {
  filtrarInventario(htmlElements.filtroInventario.value);
};

// Crear botón con estilos y texto
const crearBoton = (texto, ...estilos) => {
  let button = document.createElement("button");
  button.innerText = texto;
  button.classList.add(...estilos);
  return button;
};

// Función para crear un nuevo producto en el inventario
const crearProducto = (tipo, nombre, color, talla, cantidad) => {
  return {
    id: Date.now(),
    tipo: tipo,
    nombre: nombre,
    color: color,
    talla: talla,
    cantidad: cantidad,
  };
};

mostrarInventario(inventario);
