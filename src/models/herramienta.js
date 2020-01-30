class HerramientaModel {
    
    keyHerramienta;
    placa;
    marca;
    modelo;
    linea;

    // constructor() {}

    // SET

    setKeyHerramienta(keyHerramienta){
        this.keyHerramienta = keyHerramienta ;
    }

    setPlaca(placa){
        this.placa = placa ;
    }

    setMarca(marca){
        this.marca = marca ;
    }

    setModelo(modelo){
        this.modelo = modelo ;
    }

    setLinea(linea){
        this.linea = linea ;
    }

    // GET

    getKeyHerramienta() {
        return this.keyHerramienta;
    }

    getPlaca() {
        return this.placa;
    }

    getMarca() {
        return this.marca;
    }

    getModelo() {
        return this.modelo;
    }

    getLinea() {
        return this.linea;
    }

}

export default HerramientaModel;