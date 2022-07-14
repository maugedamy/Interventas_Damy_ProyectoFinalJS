fetch('./json/lista.json')
    .then((response) => response.json())
    .then((respCelulares) => {
        respCelulares.celulares.forEach((respCelular) => {
            celulares.push(new Celular(crearID(), respCelular.marca, respCelular.modelo, respCelular.precio, respCelular.imagen));
            cargarCelulares(celulares[id - 1])
        });
    })