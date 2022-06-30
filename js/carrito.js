// function agregarCelular() {
//     let id = crearID();
//     let marca = seleccionarMarca().toUpperCase();
//     let modelo = prompt("Ingresá el modelo del celular").toUpperCase();
//     let precio = parseFloat(prompt("Ingresá el precio del celular:"));
//     let imagen = prompt("Ingresá la ubicación de la imagen").toUpperCase();

//     celulares.push(new Celular(id, marca, modelo, precio, imagen));
//     cargarCelulares(celulares[id - 1]);
// }

function cargarCelulares(celular) {

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

// function seleccionarMarca() {
//     let marca;
//     do {
//         marca = prompt("Seleccioná el número correspondiente a la marca del celular: \n1) Iphone \n2) Samsung \n3) Motorola");
//         switch (marca) {
//             case "1":
//                 marca = "Iphone";
//                 break;
//             case "2":
//                 marca = "Samsung";
//                 break;
//             case "3":
//                 marca = "Motorola"
//                 break;
//             default:
//                 alert("No existe la selección.");
//                 marca = "-1";
//                 break;
//         }
//     } while (marca == -1)
//     return marca;
// }

function crearID() {
    id++;
    return id;
}

// function mostrarCelular() {
//     celulares.forEach((celular)=> console.table(celular));
// }

function filtrarCelular() {
    let filtrar = document.getElementById("inputBuscar").value;
    let resultados = celulares.filter((celular) => celular.nombre().toLowerCase().includes(filtrar.toLowerCase()));
    if (resultados !== undefined) {
        let card = document.getElementsByClassName("cardCelulares");
        if (filtrar != "")
            for (i = 0; i < card.length; i++)
                card[i].style.display = "none";
        resultados.forEach((resultado) => {
            document.getElementById(`card${resultado.id}`).style.display = "";
        });
    }
}

function agregarCarrito(celular) {
    carrito.push(celular);
    let h3 = document.createElement("h3");
    h3.innerText = celular.modelo;
    listaCarrito.appendChild(h3);
    calcularCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


function calcularCarrito() {
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
    while(carrito.length)
        carrito.pop();
    const carritoElements = document.getElementById("divCarrito").childNodes;
    while (carritoElements.length > 1)
        carritoElements[1].remove();
    calcularCarrito();
}