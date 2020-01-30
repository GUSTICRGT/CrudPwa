import SocioModel from '../models/socio';
import HerramientaModel from '../models/herramienta';
import SocioService from '../services/SocioService';
import {
    ValueUpper
} from '../libs/ManageDataValue';

class SocioHerramientasManage
{

    _Socio;
    _Herramientas;
    
    constructor(_socio, _herramientas){
        this._Socio = _socio;
        this._Herramientas = _herramientas;
    }

    registrar()
    {
        let _herramienta;
        let socio = new SocioModel();
        let socioService = new SocioService();
        let fechaIngreso = this._Socio.fechaIngreso;
        
        socio.seterNames(this._Socio.nombres);
        socio.seterApellidos(this._Socio.apellidos);
        socio.setCI(ValueUpper(this._Socio.ci));
        socio.setCelular(this._Socio.celular);
        socio.setFechaIngreso(((fechaIngreso.getDate() < 10) ? '0' + fechaIngreso.getDate() : fechaIngreso.getDate() ) + "/" + (((fechaIngreso.getMonth() + 1) < 10) ? '0'+(fechaIngreso.getMonth() + 1) : fechaIngreso.getMonth() + 1) + "/" + fechaIngreso.getFullYear());

        return new Promise((resolve, reject) => {
            socio.setKey(socio.getCI() + socio.getApellidoP());
            this._Herramientas.map(herramienta => {
                _herramienta = new HerramientaModel();
                _herramienta.setPlaca(ValueUpper(herramienta.placa));
                _herramienta.setModelo(ValueUpper(herramienta.modelo));
                _herramienta.setMarca(ValueUpper(herramienta.marca));
                _herramienta.setLinea(herramienta.linea);
                _herramienta.setKeyHerramienta('min-' + socio.getKey() + '-' + _herramienta.getPlaca());
                socio.setHerramientaAdd(_herramienta);
                return 0;
            });
            socioService.existeSocio(socio.getCI())
                .then((resp) => {
                    if (resp === true) {
                        reject('Socio ya registrado');

                    } else {
                        socioService.vehiculosVerified(socio.getherramientas())
                            .then((data) => {
                                if (data === undefined) {
                                    socioService.create(socio)
                                        .then(data => {
                                            resolve(data);
                                        })
                                        .catch(error => {
                                            reject(error);
                                        });
                                } else {
                                    // console.log('Error DOBLE');
                                    reject('Placa repetida');
                                }
                            })
                            .catch((error) => {
                                reject('Se produjo un error al verificar Vehiculos.');
                            });

                    }
                })
                .catch((er) => {
                    reject('al verificar Socio');
                });
        });       

    }

}

export default SocioHerramientasManage;