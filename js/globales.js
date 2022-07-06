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
btnVaciarCarrito.addEventListener("click", () => { 
    Swal.fire({
        title: 'Está seguro de eliminar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {
 
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Borrado!',
                icon: 'success',
                text: 'El archivo ha sido borrado'
            })
            vaciarCarrito();
        }
    })
});


const noResult = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay productos que coincidan con tu búsqueda',
        confirmButtonText: 'Ok'
    })
}
