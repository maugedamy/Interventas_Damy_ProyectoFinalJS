class Celular {
    constructor(id, marca, modelo, precio, imagen) {
        this.id = id
        this.marca = marca
        this.modelo = modelo
        this.precio = precio
        this.imagen = imagen
    }
    nombre(){
    return this.marca + " " + this.modelo;
    }
}

