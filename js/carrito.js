const cargarCelulares = (celular) => {

    let marca = celular.marca.toUpperCase();
    let modelo = celular.modelo;
    let precio = celular.precio.toLocaleString();
    let imagen = celular.imagen;

    let card = document.createElement("div");
    card.className = "cardCelulares card";
    card.id = `card${celular.id}`;


    let img = document.createElement("img");
    img.src = imagen;
    img.addEventListener("dblclick", () => { agregarCarrito(celular) });
    card.appendChild(img);
    let h3 = document.createElement("h3");
    h3.innerText = modelo;
    h3.addEventListener("dblclick", () => { agregarCarrito(celular) });
    card.appendChild(h3);
    let h3Precio = document.createElement("h3");
    h3Precio.innerText = '$ ' + precio;
    card.appendChild(h3Precio);

    switch (marca) {
        case "IPHONE":

            listaIphone.append(card);

            break;
        case "SAMSUNG":

            listaSamsung.append(card);

            break;
        case "MOTOROLA":

            listaMotorola.append(card);
            break;
    }
}

const crearID = () => {
    id++;
    return id;
}

const filtrarCelular = () => {
    let filtrar = document.getElementById("inputBuscar").value;
    let resultados = celulares.filter((celular) => celular.nombre().toLowerCase().includes(filtrar.toLowerCase()));
    if (resultados == undefined || resultados.length == 0) {
        noResult();
    }
    else if (resultados !== undefined) {
        let card = document.getElementsByClassName("cardCelulares");
        if (filtrar != "")
            for (i = 0; i < card.length; i++)
                card[i].style.display = "none";
        resultados.forEach((resultado) => {
            document.getElementById(`card${resultado.id}`).style.display = "";
        });
    }
}

const crearIDCarrito = () => {
    idCarrito++;
    return idCarrito;
}

const agregarCarrito = (celular) => {
    if (typeof celular.idCarrito !== 'undefined')
        idCarrito = celular.idCarrito;
    else crearIDCarrito();
    let celularCarrito = celular;
    celularCarrito.idCarrito = idCarrito;
    carrito.push(celularCarrito);
    let h3 = document.createElement("h3");
    h3.innerText = celular.modelo;
    h3.id = `idCarrito${idCarrito}`;
    listaCarrito.appendChild(h3);
    let span = document.createElement("span");
    span.style.textAlign = 'right';
    h3.appendChild(span);
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.classList.add('bi');
    svg.classList.add('bi-trash3');
    svg.id = `cestoID${idCarrito}`;
    span.appendChild(svg);
    quitarDelCarritoAlert(idCarrito);
    const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );

    path.setAttribute(
        'd',
        'M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z'
    );
    //   path.setAttribute('stroke-linecap', 'round');
    //   path.setAttribute('stroke-linejoin', 'round');
    //   path.setAttribute('stroke-width', '2');

    svg.appendChild(path);
    calcularCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarNuevoEnCarrito();
}

const mostrarNuevoEnCarrito = () => {
    Swal.fire({
        icon: 'success',
        title: 'Agregaste el celular al carrito',
        confirmButtonText: 'Ok'
    })
}

const quitarDelCarritoAlert = (idCesto) => {
    const btnCesto = document.getElementById(`cestoID${idCesto}`);
    btnCesto.addEventListener("click", () => {
        Swal.fire({
            title: '¿Está seguro de eliminar el elemento del carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero'
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Borrado!',
                    icon: 'success',
                    text: 'El elemento ha sido eliminado del carrito'
                })
                quitarDelCarrito(idCesto);
            }
        })
    });
    calcularCarrito();
}

const quitarDelCarrito = (idCesto) => {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoRecuperado)
        localStorage.removeItem("carrito")
        
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].idCarrito == idCesto) {
            carrito.splice(i,1);
            break;
        }
    }

    if (carrito.length > 0)
        localStorage.setItem("carrito", JSON.stringify(carrito))

    document.getElementById(`idCarrito${idCesto}`).remove();
    calcularCarrito();
}

const calcularCarrito = () => {
    let total = carrito.reduce((suma, celular) => suma + celular.precio, 0);
    let h2 = document.getElementById("precioTotal");
    h2.innerText = "Total de compra $ " + total.toLocaleString();
}

const recuperarCarrito = () => {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoRecuperado)
        for (const celular of carritoRecuperado)
            agregarCarrito(celular);
}

const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    while (carrito.length)
        carrito.pop();
    const carritoElements = document.getElementById("divCarrito").childNodes;
    while (carritoElements.length > 1)
        carritoElements[1].remove();
    calcularCarrito();
}


