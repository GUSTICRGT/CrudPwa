import {
    fireData
} from '../config/fire';

class SocioService
{

    constructor()
    {
        this._socioRef = fireData.ref().child('Socios');
    }

    create(socio)
    {
        return new Promise((resolve, reject) => {
          this._socioRef.child('socio' + socio.getKey()).set(socio)
            .then(() => {
                socio.getherramientas().forEach(tool => {
                    this._socioRef.child('socio' + socio.getKey() + '/herramientas/' + tool.getKeyHerramienta())
                        .set(tool)
                            .then(()=>{
                                resolve(true);
                            })
                            .catch(err=>{
                                reject(err)
                            })
                });                
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    existeSocio(ci)
    {
        var existe = false;
        return new Promise((resolve, reject) => {
            this._socioRef.once('value', (socios) => {
                socios.forEach(socio => {
                    if (socio.val().CI) {
                        if (socio.val().CI.toLowerCase() === ci.toLowerCase()) {
                            existe = true;
                        }
                    }
                });
            })
            .then(() => {
                resolve(existe);
            })
            .catch(error => {
                reject(existe);
            });
        });
    }

    async vehiculosVerified(herramientas, c, err)
    {
        var tam;
        if (err === true) {
            return err;
        } else {
            if (c === undefined) {
                tam = herramientas.length;
            } else {
                tam = c - 1;
            }
            if (tam > 0) {                
                const respHerr = await this.existeVehiculo(herramientas[tam - 1].placa);
                if (respHerr) {
                    return await this.vehiculosVerified(herramientas, tam, respHerr);
                } else {
                    return await this.vehiculosVerified(herramientas, tam);
                }
            }
        }      
    }

    existeVehiculo(placa) 
    {
        var existe = false;
        return new Promise((resolve, reject) => {
            this._socioRef.once('value', (socios) => {
                    socios.forEach(socio => {
                        for (var herramienta in socio.val().herramientas) {
                            if (socio.val().herramientas[herramienta].placa.toLowerCase() === placa.toLowerCase()) {
                                existe = true;
                            }
                        }
                    });
                })
                .then(() => {
                    resolve(existe);
                })
                .catch(() => {
                    reject(existe);
                });
        });
    }

    cantidadSocios()
    {
        var num = 0;
        return new Promise((resolve, reject) => {
            this._socioRef.once('value', (socio) => {
                num = socio.numChildren();
            })
            .then(()=>{
                resolve(num);
            })
            .catch(error=>{
                reject(error);
            });
        })

    }

    agregarVehiculo(rutaSocioAppendVehiculo, vehiculo) 
    {
        return new Promise((resolve, reject) => {
            this._socioRef.child(rutaSocioAppendVehiculo)
                .set(vehiculo)
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject('Error al agregar vehículo')
                });
        });
    }

    eliminarSocio(keySocio)
    {
        return new Promise((resolve, reject) => {
            this._socioRef.child(keySocio).remove()
                .then((val)=>{
                    resolve(val);   
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    eliminarVehiculo(keyVehiculo) 
    {
        return new Promise((resolve, reject) => {
            this._socioRef.child(keyVehiculo).remove()
                .then(() => {
                    resolve({
                        transaccion: true,
                        key: keyVehiculo
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}

export default SocioService;
