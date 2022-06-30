const celulares = [];

let id = 0;

const carrito = [];

const listaIphone = document.getElementById("divIphone");
const listaSamsung = document.getElementById("divSamsung");
const listaMotorola = document.getElementById("divMotorola");

const listaCarrito = document.getElementById("divCarrito");

const btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = () => { filtrarCelular() };

recuperarCarrito();

const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
btnVaciarCarrito.addEventListener("click", vaciarCarrito);
