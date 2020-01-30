import {
    fireData
} from '../config/fire';

class TransaccionesService
{
    constructor() 
    {
        this._transaccionesRef = fireData.ref().child('Transacciones');
    }

    registrarTransaccion(transaccion)
    {
        return new Promise((resolve, reject) => {
            this._transaccionesRef.child(transaccion.getkeyTransaccion()).set(transaccion)
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}

export default TransaccionesService;