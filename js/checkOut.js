document.addEventListener("submit", (e) => {
    e.preventDefault()
    guardarDatosUsuario()
    finCompra()
})

const finCompra = () => {
    Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu pedido!',
        text: 'En breve nos pondremos en contacto para finalizar la compra',
        confirmButtonText: 'Ok'
    })
}

const guardarDatosUsuario = () => {
    const datosDeUsr = {
        nombre: inputNombre.value,
        telefono: inputTelefono.value,
        email: inputEmail.value
    }
    let str = JSON.stringify(datosDeUsr)
    localStorage.setItem("datosUsuario", str)
}

const body = document.getElementsByTagName("body")[0];

const agregarFooter = () => {
    let footer = document.createElement("footer");
    let h6Footer = document.createElement("h6");
    h6Footer.innerText = "Creado por Mauge. Todos los derechos reservados®";
    footer.appendChild(h6Footer);
    footer.style.position = 'fixed'
    body.append(footer);
}

agregarFooter();