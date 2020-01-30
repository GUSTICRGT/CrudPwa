import SocioModel from '../models/socio';
import HerramientaModel from '../models/herramienta';
import TransaccionModel from '../models/transaccion';
import SocioService from '../services/SocioService';
import TransaccionesService from '../services/TransaccionesService';
import {
    ValueUpper,
    GetDate,
    NumberRandom,
} from '../libs/ManageDataValue';

class TransaccionesManage
{
    _SocioTransaccion;
    fechaTransaccion;
    precioTransaccion;

    constructor(_socio) 
    {
        this._SocioTransaccion = _socio;
    }

    cambioNombre(socio, vehiculos)
    {
        let _herramienta;
        let _socioTransaccionCopy = this._SocioTransaccion;
        let socioService = new SocioService();
        let transaccionService = new TransaccionesService();
        let _herramientas = [];
        let transaccion = new TransaccionModel();

        var _dia = (this.fechaTransaccion.getDate() < 10) ? '0' + this.fechaTransaccion.getDate() : this.fechaTransaccion.getDate();
        var _mes = ((this.fechaTransaccion.getMonth() + 1) < 10) ? '0' + (this.fechaTransaccion.getMonth() + 1) : this.fechaTransaccion.getMonth() + 1;
        var _anho = this.fechaTransaccion.getFullYear();

        transaccion.settipoTransaccion("CAMBIO DE NOMBRE");
        if(
            (_dia + '/' + _mes + '/' + _anho) === GetDate()
        )
        {
            transaccion.setfechaHoraTransaccion(GetDate(null, null, null, true));                                    
        }
        else
        {
            transaccion.setfechaHoraTransaccion(GetDate(
                '/', 
                (_mes + '/' + _dia + '/' + _anho),
                null, 
                true
            ));
        }
        transaccion.setsocioPrevio(this._SocioTransaccion); 
        transaccion.setsocioSiguente(socio);
        transaccion.setvehiculos(vehiculos);
        transaccion.setkeyTransaccion('CN-' + socio.getCI() + '-' + socio.getApellidoP() + '-' + NumberRandom(100000, 900000) + '-' + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + GetDate(''));
        transaccion.setprecioTransaccion(this.precioTransaccion);

        vehiculos.map(herramienta => {
            _socioTransaccionCopy.herramientas.delete(herramienta.getKeyHerramienta());
            _herramienta = new HerramientaModel();
            _herramienta.setPlaca(ValueUpper(herramienta.placa));
            _herramienta.setModelo(ValueUpper(herramienta.modelo));
            _herramienta.setMarca(ValueUpper(herramienta.marca));
            _herramienta.setLinea(herramienta.linea);
            _herramienta.setKeyHerramienta('min-' + socio.getKey().split('socio')[1] + '-' + _herramienta.getPlaca());
            socio.setHerramientaAdd(_herramienta);
            _herramientas.push(_herramienta);
            return 0;
        });

        return new Promise((resolve, reject) => {
            if (_socioTransaccionCopy.herramientas.size === 0) {
                socioService.eliminarSocio(this._SocioTransaccion.getKey())
                    .then(() => {
                        var addCars = _herramientas.map(async _herramientaNew => {
                            return socioService.agregarVehiculo(socio.getKey() + '/herramientas/' + _herramientaNew.getKeyHerramienta(), _herramientaNew)
                                .then(data => {
                                    return data;
                                })
                                .catch(err=>{
                                    return err;
                                });
                        });
                        Promise.all(addCars)
                            .then(() => {                                
                                transaccionService.registrarTransaccion(transaccion)
                                    .then(data=>{
                                        resolve(data);
                                    })
                                    .catch(er=>{
                                        reject('Error al registrar transacción');
                                    });                                
                            })
                            .catch(error => {
                                reject(error);
                            });
                    })
                    .catch(() => {
                        reject('Error al eliminar Socio');
                    });
            } else{
                var deleteCars = vehiculos.map(async herramienta => {
                    return socioService.eliminarVehiculo(this._SocioTransaccion.getKey() + '/herramientas/' + herramienta.getKeyHerramienta())
                        .then(data => {
                            return data;
                        })
                        .catch(err=>{
                            return err;
                        });
                });
                Promise.all(deleteCars)
                    .then(() => {
                        var addCars = _herramientas.map(async _herramientaNew => {
                            return socioService.agregarVehiculo(socio.getKey() + '/herramientas/' + _herramientaNew.getKeyHerramienta(), _herramientaNew)
                                .then(data => {
                                    return data;
                                })
                                .catch(err => {
                                    return err;
                                });
                        });
                        Promise.all(addCars)
                            .then(() => {
                                transaccionService.registrarTransaccion(transaccion)
                                    .then(data=>{
                                        resolve(data);
                                    })
                                    .catch(er=>{
                                        reject('Error al registrar transacción');
                                    });                                
                            })
                            .catch(error => {
                                reject(error);
                            });
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        });
    }

    cambioNombreNewSocio(newSocio, vehiculos)
    {
        let _herramienta;
        let socio = new SocioModel();
        let _socioTransaccionCopy = this._SocioTransaccion;
        let socioService = new SocioService();
        let transaccionService = new TransaccionesService();
        let fechaIngreso = newSocio.fechaIngreso;
        let transaccion = new TransaccionModel();

        var _dia = (this.fechaTransaccion.getDate() < 10) ? '0' + this.fechaTransaccion.getDate() : this.fechaTransaccion.getDate();
        var _mes = ((this.fechaTransaccion.getMonth() + 1) < 10) ? '0' + (this.fechaTransaccion.getMonth() + 1) : this.fechaTransaccion.getMonth() + 1;
        var _anho = this.fechaTransaccion.getFullYear();
           
        socio.seterNames(newSocio.nombres);
        socio.seterApellidos(newSocio.apellidos);
        socio.setCI(ValueUpper(newSocio.ci));
        socio.setCelular(newSocio.celular);
        socio.setFechaIngreso(((fechaIngreso.getDate() < 10) ? '0' + fechaIngreso.getDate() : fechaIngreso.getDate() ) + "/" + (((fechaIngreso.getMonth() + 1) < 10) ? '0'+(fechaIngreso.getMonth() + 1) : fechaIngreso.getMonth() + 1) + "/" + fechaIngreso.getFullYear());
        socio.setKey(socio.getCI() + socio.getApellidoP());

        transaccion.settipoTransaccion("CAMBIO DE NOMBRE");
        if(
            (_dia + '/' + _mes + '/' + _anho) === GetDate()
        )
        {
            transaccion.setfechaHoraTransaccion(GetDate(null, null, null, true));                                    
        }
        else
        {
            transaccion.setfechaHoraTransaccion(GetDate(
                '/', 
                (_mes + '/' + _dia + '/' + _anho),
                null, 
                true
            ));
        }
        transaccion.setsocioPrevio(this._SocioTransaccion);
        transaccion.setsocioSiguente(socio);
        transaccion.setvehiculos(vehiculos);
        transaccion.setkeyTransaccion('CNN-' + socio.getCI() + '-' + socio.getApellidoP() + '-' + NumberRandom(100000, 900000) + '-' + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + GetDate(''));
        transaccion.setprecioTransaccion(this.precioTransaccion);

        return new Promise((resolve, reject) => {
            vehiculos.map(herramienta => {
                _socioTransaccionCopy.herramientas.delete(herramienta.getKeyHerramienta());
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
                    if (resp === false) {
                        if (_socioTransaccionCopy.herramientas.size === 0) {
                            socioService.eliminarSocio(this._SocioTransaccion.getKey())
                                .then(() => {
                                    socioService.create(socio)
                                        .then(() => {                                            
                                            transaccionService.registrarTransaccion(transaccion)
                                                .then(data => {
                                                    resolve(data);
                                                })
                                                .catch(er => {
                                                    reject('Error al registrar transacción');
                                                });
                                        })
                                        .catch(error => {
                                            reject(error);
                                        });
                                })
                                .catch(() => {
                                    reject('Error al eliminar Socio');
                                });
                        } else {
                            var deleteCars = vehiculos.map(async herramienta => {
                                return socioService.eliminarVehiculo(this._SocioTransaccion.getKey() + '/herramientas/' + herramienta.getKeyHerramienta())
                                    .then(data => {
                                        return data;
                                    })
                                    .catch(err => {
                                        return err;
                                    });
                            });

                            Promise.all(deleteCars)
                                .then(() => {
                                    socioService.create(socio)
                                        .then(() => {
                                            transaccionService.registrarTransaccion(transaccion)
                                                .then(data => {
                                                    resolve(data);
                                                })
                                                .catch(er => {
                                                    reject('Error al registrar transacción');
                                                });
                                        })
                                        .catch(error => {
                                            reject(error);
                                        });
                                })
                                .catch(error => {
                                    reject(error);
                                });
                        }
                    } else {
                        resolve('Socio ya registrado')
                    }
                })
                .catch(() => {
                    reject('al verificar Socio');
                });
        });      
    }

    cambioVehiculo(vehiculoSelected, newVehiculoSelected, tipoCambioVehiculo)
    {
        let socioService = new SocioService();
        let transaccionService = new TransaccionesService();
        let transaccion = new TransaccionModel();
        let _herramienta = new HerramientaModel();

        _herramienta.setPlaca(ValueUpper(newVehiculoSelected.placa));
        _herramienta.setModelo(ValueUpper(newVehiculoSelected.modelo));
        _herramienta.setMarca(ValueUpper(newVehiculoSelected.marca));
        _herramienta.setLinea(newVehiculoSelected.linea);
        _herramienta.setKeyHerramienta('min-' + this._SocioTransaccion.getKey().split('socio')[1] + '-' + _herramienta.getPlaca());

        var _dia = (this.fechaTransaccion.getDate() < 10) ? '0' + this.fechaTransaccion.getDate() : this.fechaTransaccion.getDate();
        var _mes = ((this.fechaTransaccion.getMonth() + 1) < 10) ? '0' + (this.fechaTransaccion.getMonth() + 1) : this.fechaTransaccion.getMonth() + 1;
        var _anho = this.fechaTransaccion.getFullYear();

        transaccion.settipoTransaccion( (tipoCambioVehiculo) ? "SUBIDA DE MODELO" : "REBAJE DE MODELO" );

        if( (_dia + '/' + _mes + '/' + _anho) === GetDate() )
        {
            transaccion.setfechaHoraTransaccion(GetDate(null, null, null, true));
        }
        else
        {
            transaccion.setfechaHoraTransaccion(GetDate(
                '/',
                (_mes + '/' + _dia + '/' + _anho),
                null,
                true
            ));
        }

        transaccion.setsocioPrevio(this._SocioTransaccion);
        transaccion.setsocioSiguente(null);
        transaccion.setvehiculos([vehiculoSelected, _herramienta]);
        transaccion.setkeyTransaccion( ( (tipoCambioVehiculo) ? 'SM-' : 'RM-' ) + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + NumberRandom(100000, 900000) + '-' + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + GetDate(''));
        transaccion.setprecioTransaccion(this.precioTransaccion);

        return new Promise((resolve, reject) => {
            socioService.vehiculosVerified([_herramienta])
                .then((data) => {
                    if (data === undefined) {
                        socioService.eliminarVehiculo(this._SocioTransaccion.getKey() + '/herramientas/' + vehiculoSelected.getKeyHerramienta())
                            .then(data => {
                                socioService.agregarVehiculo(this._SocioTransaccion.getKey() + '/herramientas/' + _herramienta.getKeyHerramienta(), _herramienta)
                                    .then(d => {
                                        // resolve(true);
                                        transaccionService.registrarTransaccion(transaccion)
                                            .then( () => {
                                                resolve(true);
                                            })
                                            .catch(e => {
                                                reject("Error al registrar transacción");
                                            });
                                    })
                                    .catch(e => {
                                        reject("Error al registrar vehículo");
                                    });
                            })
                            .catch(err => {
                                reject("Error al eliminar vehículo");
                            });
                    } else {
                        reject('Placa repetida');
                    }
                })
                .catch((error) => {
                    reject("Error al verificar vehículo");
                });
        });
    }

    nuevoVehiculoTransaccion(newVehiculoSelected)
    {
        let socioService = new SocioService();
        let transaccionService = new TransaccionesService();
        let transaccion = new TransaccionModel();
        let _herramienta = new HerramientaModel();

        _herramienta.setPlaca(ValueUpper(newVehiculoSelected.placa));
        _herramienta.setModelo(ValueUpper(newVehiculoSelected.modelo));
        _herramienta.setMarca(ValueUpper(newVehiculoSelected.marca));
        _herramienta.setLinea(newVehiculoSelected.linea);
        _herramienta.setKeyHerramienta('min-' + this._SocioTransaccion.getKey().split('socio')[1] + '-' + _herramienta.getPlaca());

        var _dia = (this.fechaTransaccion.getDate() < 10) ? '0' + this.fechaTransaccion.getDate() : this.fechaTransaccion.getDate();
        var _mes = ((this.fechaTransaccion.getMonth() + 1) < 10) ? '0' + (this.fechaTransaccion.getMonth() + 1) : this.fechaTransaccion.getMonth() + 1;
        var _anho = this.fechaTransaccion.getFullYear();

        transaccion.settipoTransaccion('NUEVO VEHÍCULO');

        if( (_dia + '/' + _mes + '/' + _anho) === GetDate() )
        {
            transaccion.setfechaHoraTransaccion(GetDate(null, null, null, true));
        }
        else
        {
            transaccion.setfechaHoraTransaccion(GetDate(
                '/',
                (_mes + '/' + _dia + '/' + _anho),
                null,
                true
            ));
        }

        transaccion.setsocioPrevio(this._SocioTransaccion);
        transaccion.setsocioSiguente(null);
        transaccion.setvehiculos([_herramienta]);
        transaccion.setkeyTransaccion( 'NV-' + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + NumberRandom(100000, 900000) + '-' + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + GetDate(''));
        transaccion.setprecioTransaccion(this.precioTransaccion);

        return new Promise((resolve, reject) => {
            socioService.vehiculosVerified([_herramienta])
                .then((data) => {
                    if (data === undefined) {
                        socioService.agregarVehiculo(this._SocioTransaccion.getKey() + '/herramientas/' + _herramienta.getKeyHerramienta(), _herramienta)
                            .then(d => {
                                // resolve(true);
                                transaccionService.registrarTransaccion(transaccion)
                                    .then( () => {
                                        resolve(true);
                                    })
                                    .catch(e => {
                                        reject("Error al registrar transacción");
                                    });
                            })
                            .catch(e => {
                                reject("Error al registrar vehículo");
                            });
                    } else {
                        reject('Placa repetida');
                    }
                })
                .catch((error) => {
                    reject("Error al verificar vehículo");
                });
        });

    }

    eliminarVehiculoTransaccion(vehiculoSelected)
    {
        let socioService = new SocioService();
        let transaccionService = new TransaccionesService();
        let transaccion = new TransaccionModel();

        var _dia = (this.fechaTransaccion.getDate() < 10) ? '0' + this.fechaTransaccion.getDate() : this.fechaTransaccion.getDate();
        var _mes = ((this.fechaTransaccion.getMonth() + 1) < 10) ? '0' + (this.fechaTransaccion.getMonth() + 1) : this.fechaTransaccion.getMonth() + 1;
        var _anho = this.fechaTransaccion.getFullYear();

        transaccion.settipoTransaccion( 'ELIMINACIÓN DE VEHÍCULO' );

        if( (_dia + '/' + _mes + '/' + _anho) === GetDate() )
        {
            transaccion.setfechaHoraTransaccion(GetDate(null, null, null, true));
        }
        else
        {
            transaccion.setfechaHoraTransaccion(GetDate(
                '/',
                (_mes + '/' + _dia + '/' + _anho),
                null,
                true
            ));
        }

        transaccion.setsocioPrevio(this._SocioTransaccion);
        transaccion.setsocioSiguente(null);
        transaccion.setvehiculos([vehiculoSelected]);
        transaccion.setkeyTransaccion( 'EV-' + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + NumberRandom(100000, 900000) + '-' + this._SocioTransaccion.getCI() + '-' + this._SocioTransaccion.getApellidoP() + '-' + GetDate(''));
        transaccion.setprecioTransaccion(this.precioTransaccion);

        return new Promise((resolve, reject) => {
            socioService.eliminarVehiculo(this._SocioTransaccion.getKey() + '/herramientas/' + vehiculoSelected.getKeyHerramienta())
                .then(data => {
                    transaccionService.registrarTransaccion(transaccion)
                        .then( () => {
                            resolve(true);
                        })
                        .catch(e => {
                            reject("Error al registrar transacción");
                        });
                })
                .catch(err => {
                    reject("Error al eliminar vehículo");
                });
        });
    }

}

export default TransaccionesManage;