function agregarCelular() {
    let id = crearID();
    let marca = seleccionarMarca().toUpperCase();
    let modelo = prompt("Ingresá el modelo del celular").toUpperCase();
    let precio = parseFloat(prompt("Ingresá el precio del celular:"));
    let imagen = prompt("Ingresá la ubicación de la imagen").toUpperCase();

    celulares.push(new Celular(id, marca, modelo, precio, imagen));
    cargarCelulares(celulares[id - 1]);
}

function cargarCelulares(celular){

    let marca = celular.marca;
    let modelo = celular.modelo;
    let imagen = celular.imagen;

    switch(marca) {
        case "IPHONE": 
            let h3Iphone = document.createElement("h3");
            h3Iphone.innerText = modelo;
            h3Iphone.addEventListener("dblclick", ()=> { agregarCarrito(celular) });
            listaIphone.append(h3Iphone);
            let imgIphone = document.createElement("img");
            imgIphone.src = imagen;
            imgIphone.addEventListener("dblclick", ()=> { agregarCarrito(celular) });
            listaIphone.append(imgIphone);
            break;
        case "SAMSUNG":
            let h3Samsung = document.createElement("h3");
            h3Samsung.innerText = modelo;
            h3Samsung.addEventListener("dblclick", ()=> { agregarCarrito(celular) });
            listaSamsung.append(h3Samsung);
            let imgSamsung = document.createElement("img");
            imgSamsung.src = imagen;
            imgSamsung.addEventListener("dblclick", ()=> { agregarCarrito(celular) });
            listaSamsung.append(imgSamsung);
            break;
        case "MOTOROLA":
            let h3Motorola = document.createElement("h3");
            h3Motorola.innerText = modelo;
            h3Motorola.addEventListener("dblclick", ()=> { agregarCarrito(celular) });
            listaMotorola.append(h3Motorola)
            let imgMotorola = document.createElement("img");
            imgMotorola.src = imagen;
            imgMotorola.addEventListener("dblclick", ()=> { agregarCarrito(celular) });
            listaMotorola.append(imgMotorola);
            break;
    }
}

function seleccionarMarca() {
    let marca;
    do {
        marca = prompt("Seleccioná el número correspondiente a la marca del celular: \n1) Iphone \n2) Samsung \n3) Motorola");
        switch(marca) {
            case "1":
                marca = "Iphone";
                break;
            case "2":
                marca = "Samsung";
                break;
            case "3":
                marca = "Motorola"
                break;
            default:
                alert("No existe la selección.");
                marca = "-1";
                break;
        }
    } while(marca == -1)
    return marca;
}

function crearID() {
    id++;
    return id;
}

function mostrarCelular() {
    celulares.forEach((celular)=> console.table(celular));
}

function buscarCelular() {
    let buscar = prompt("¿Qué celular buscás?").toUpperCase();
    let resultado = celulares.find((celular)=> celular.nombre().includes(buscar));
    if(resultado !== undefined) {
        console.clear();
        console.table(resultado)
    }
}

function filtrarCelular() {
    let filtrar = prompt("¿Qué celular buscás?").toUpperCase();
    let resultado = celulares.filter((celular)=> celular.nombre().includes(filtrar));
    if(resultado !== undefined) {
        console.clear();
        console.table(resultado);
    }
}

function agregarCarrito(celular) {
    carrito.push(celular);
    let h3 = document.createElement("h3");
        h3.innerText = celular.modelo;
        listaCarrito.append(h3);
    calcularCarrito()
}

function calcularCarrito() {
    console.clear();
    let total = carrito.reduce((suma,celular)=> suma + celular.precio, 0);
    let h2 = document.getElementById("precioTotal");
    h2.innerText = "Total de compra $ "+ total;
    console.log("Total de compra: ", total);
}