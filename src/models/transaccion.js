import HerramientaModel from "./herramienta";
import SocioModel from "./socio";

class TransaccionModel
{
    keyTransaccion;
    vehiculos;
    socioPrevio;
    socioSiguente;
    fechaHoraTransaccion;
    tipoTransaccion;
    precioTransaccion;

    constructor()
    {
        this.vehiculos = new Map();
    }

    //seter Object firebase
    dataFireObjSet(fireObj){

        let _vehiculo;
        let _socioPrevio = new SocioModel();
        let _socioSiguiente;

        this.setkeyTransaccion(fireObj.key);
        this.setfechaHoraTransaccion(fireObj.val().fechaHoraTransaccion);
        this.settipoTransaccion(fireObj.val().tipoTransaccion);
        this.setprecioTransaccion(fireObj.val().precioTransaccion);

        _socioPrevio.setKey(fireObj.val().socioPrevio.keySocio);

        if (fireObj.val().socioPrevio.sNombre === undefined) {
            _socioPrevio.seterNames(fireObj.val().socioPrevio.pNombre);
        } else {
            _socioPrevio.seterNames(fireObj.val().socioPrevio.pNombre + ' ' + fireObj.val().socioPrevio.sNombre);
        }

        if (fireObj.val().socioPrevio.apellidoM === undefined) {
            _socioPrevio.seterApellidos(fireObj.val().socioPrevio.apellidoP);
        } else {
            _socioPrevio.seterApellidos(fireObj.val().socioPrevio.apellidoP + ' ' + fireObj.val().socioPrevio.apellidoM);
        }

        _socioPrevio.setCI(fireObj.val().socioPrevio.CI);
        _socioPrevio.setCI(fireObj.val().socioPrevio.Celular);
        _socioPrevio.setCI(fireObj.val().socioPrevio.fechaIngreso);

        for (const key in fireObj.val().vehiculos) {
            _vehiculo = new HerramientaModel();
            _vehiculo.setKeyHerramienta(key);
            _vehiculo.setLinea(fireObj.val().vehiculos[key].linea);
            _vehiculo.setMarca(fireObj.val().vehiculos[key].marca);
            _vehiculo.setModelo(fireObj.val().vehiculos[key].modelo);
            _vehiculo.setPlaca(fireObj.val().vehiculos[key].placa);
            this.setvehiculosAdd(_vehiculo);
        }

        if (fireObj.val().socioSiguente !== undefined) {
            _socioSiguiente = new SocioModel();
            _socioSiguiente.setKey(fireObj.val().socioSiguente.keySocio);

            if (fireObj.val().socioSiguente.sNombre === undefined) {
                _socioSiguiente.seterNames(fireObj.val().socioSiguente.pNombre);
            } else {
                _socioSiguiente.seterNames(fireObj.val().socioSiguente.pNombre + ' ' + fireObj.val().socioSiguente.sNombre);
            }

            if (fireObj.val().socioSiguente.apellidoM === undefined) {
                _socioSiguiente.seterApellidos(fireObj.val().socioSiguente.apellidoP);
            } else {
                _socioSiguiente.seterApellidos(fireObj.val().socioSiguente.apellidoP + ' ' + fireObj.val().socioSiguente.apellidoM);
            }

            _socioSiguiente.setCI(fireObj.val().socioSiguente.CI);
            _socioSiguiente.setCelular(fireObj.val().socioSiguente.Celular);
            _socioSiguiente.setFechaIngreso(fireObj.val().socioSiguente.fechaIngreso);
            this.setsocioSiguente(_socioSiguiente);
        }

        this.setsocioPrevio(_socioPrevio);

    }

    // GET
    getkeyTransaccion(){
        return this.keyTransaccion;
    }

    getvehiculos(){
        return this.vehiculos;
    }

    getsocioPrevio(){
        return this.socioPrevio;
    }

    getsocioSiguente(){
        return this.socioSiguente;
    }

    getfechaHoraTransaccion(){
        return this.fechaHoraTransaccion;
    }

    gettipoTransaccion(){
        return this.tipoTransaccion;
    }
    
    getprecioTransaccion(){
        return this.precioTransaccion;
    }

    // SET
    setkeyTransaccion(_keyTransaccion) {
        this.keyTransaccion = _keyTransaccion;
    }

    setvehiculosAdd(_vehiculos) {
        this.vehiculos.set(_vehiculos.getKeyHerramienta(), _vehiculos);
    }

    setvehiculos(_vehiculos) {
        this.vehiculos = _vehiculos;
    }

    setsocioPrevio(_socioPrevio) {
        this.socioPrevio = _socioPrevio;
    }

    setsocioSiguente(_socioSiguente) {
        this.socioSiguente = _socioSiguente;
    }

    setfechaHoraTransaccion(_fechaHoraTransaccion) {
        this.fechaHoraTransaccion = _fechaHoraTransaccion;
    }

    settipoTransaccion(_tipoTransaccion) {
        this.tipoTransaccion = _tipoTransaccion;
    }

    setprecioTransaccion(_precioTransaccion){
        this.precioTransaccion = _precioTransaccion;
    }

}

export default TransaccionModel;