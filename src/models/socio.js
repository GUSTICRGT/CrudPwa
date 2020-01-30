import {
    ValueCapitalize
} from '../libs/ManageDataValue';

import HerramientaModel from './herramienta';

class SocioModel 
{

    keySocio;
    pNombre;
    sNombre;
    apellidoP;
    apellidoM;
    CI;
    fechaIngreso;
    Celular;

    herramientas = new Map();

    // constructor(){}

    //seter Object firebase
    dataFireObjSet(fireObj){
        let herramienta;
        for (const key in fireObj.val().herramientas) {
            herramienta = new HerramientaModel();
            herramienta.setKeyHerramienta(key);
            herramienta.setLinea(fireObj.val().herramientas[key].linea);
            herramienta.setMarca(fireObj.val().herramientas[key].marca);
            herramienta.setModelo(fireObj.val().herramientas[key].modelo);
            herramienta.setPlaca(fireObj.val().herramientas[key].placa);
            this.setHerramientaAdd(herramienta);
        }
        
        if (fireObj.val().sNombre === undefined) {
            this.seterNames(fireObj.val().pNombre);
        } else {
            this.seterNames(fireObj.val().pNombre + ' ' + fireObj.val().sNombre);
        }

        if (fireObj.val().apellidoM === undefined) {
            this.seterApellidos(fireObj.val().apellidoP);
        } else {
            this.seterApellidos(fireObj.val().apellidoP + ' ' + fireObj.val().apellidoM);
        }
        this.setKey(fireObj.key);
        this.setCI(fireObj.val().CI);
        this.setFechaIngreso(fireObj.val().fechaIngreso);
        this.setCelular(fireObj.val().Celular);
    }

    // nombres 

    seterNames(cadena){
        var nombres = cadena.trim().split(' ');
        var c = 0;
        var snombre = '';
        nombres.forEach( nombre => {
            if ( c === 0 ) {
                this.setPNombre(ValueCapitalize(nombre));
            } else {
                if (c === 1) {
                    snombre = nombre;
                    this.setSNombre(ValueCapitalize(snombre));
                } else {
                    snombre = ' ' + nombre;
                    this.setSNombre(ValueCapitalize(snombre));
                }                
            }
            c = c + 1 ;
        } );
    }

    // apellidos

    seterApellidos(cadena) {
        var apellidos = cadena.trim().split(' ');
        var c = 0;
        var tapellidos = '';
        apellidos.forEach(apellido => {
            if (c === 0) {
                this.setApellidoP(ValueCapitalize(apellido));
            } else {
                if (c === 1) {
                    tapellidos = apellido;
                    this.setApellidoM(ValueCapitalize(tapellidos));
                } else {
                    tapellidos = ' ' + apellido;
                    this.setApellidoM(ValueCapitalize(tapellidos));
                }
            }
            c = c + 1;
        });
    }

    // get methods

    getShortName(){
        return this.pNombre + ' ' + this.apellidoP;
    }

    getFullName() {
        return (this.sNombre === '' || this.sNombre === null || this.sNombre === undefined) ?
                    ( (this.apellidoM === '' || this.apellidoM === null || this.apellidoM === undefined) ?
                        this.getShortName() : 
                        this.pNombre + ' ' + this.apellidoP + ' ' + this.apellidoM ) : 
                    ( (this.apellidoM === '' || this.apellidoM === null || this.apellidoM === undefined) ?
                        this.pNombre + ' ' + this.sNombre + ' ' + this.apellidoP :
                        this.pNombre + ' ' + this.sNombre + ' ' + this.apellidoP + ' ' + this.apellidoM)
                    ;
    }

    // SET

    setHerramientaAdd(herramienta){
        // Object.defineProperty(this.herramientas, herramienta.getKeyHerramienta(), {
        //     value: herramienta,
        // });
        // this.herramientas.push(herramienta);
        this.herramientas.set(herramienta.getKeyHerramienta(), herramienta);
    }

    setKey(key){
        this.keySocio = key;
    }

    setPNombre(pNombre){
        this.pNombre = pNombre;
    }

    setSNombre(sNombre){
        this.sNombre = sNombre;
    }

    setApellidoP(apellidoP){
        this.apellidoP = apellidoP;
    }

    setApellidoM(apellidoM){
        this.apellidoM = apellidoM;
    }

    setCI(ci){
        this.CI = ci;
    }

    setFechaIngreso(fechaIngreso){
        this.fechaIngreso = fechaIngreso;
    }

    setCelular(celular){
        this.Celular = celular;
    }

    // GET

    getHerramienta(keyHerramienta) {
        let herr = null;
        this.herramientas.forEach(herramienta => {
            if (keyHerramienta === herramienta.getKeyHerramienta()) {
                herr = herramienta;
            }
        });
        return herr;
    }

    getherramientas() {
        return this.herramientas;
    }

    getKey() {
        return this.keySocio;
    }

    getPNombre() {
        return this.pNombre;
    }

    getSNombre() {
        return this.sNombre;
    }

    getApellidoP() {
        return this.apellidoP;
    }

    getApellidoM() {
        return this.apellidoM;
    }

    getCI() {
        return this.CI;
    }

    getFechaIngreso() {
        return this.fechaIngreso;
    }

    getCelular() {
        return this.Celular;
    }

}

export default SocioModel;