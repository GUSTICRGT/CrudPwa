import React, { Component } from "react";
import MaterialTable from "material-table";
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from '@material-ui/core';

import { fireData } from '../../config/fire';

import {
    MonetizationOn,
    VerifiedUser,
    Phone,
    DirectionsCar,
    SwapHoriz,
    Today, Person,
} from '@material-ui/icons';
import TransaccionModel from "../../models/transaccion";

const styleArray = {
    interiorTabla: {
        padding: '1rem',
    },
    expandedStyle:{
        boxShadow: '12px 12px 18px 0px #264981',
        margin: '1rem',
    },
};

// style error COLOR INHERIT
// Ok, ill now post the easiest way there could be:

// Go into your node_modules / material - table / dist / components / m - table - toolbar.js file
// Then to line 124 change
// remove or comment // color: "inherit",

// save and restart app

// Note: If you should do npm install again, you will probably have to repeat the step until the official version is out; -)

// Hopefully something will be released soon, each github mail arrives I'm thinking that one of the other issues is being addressed, but its away this one haha

class ListaTransacciones extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            columns: [
                { title: 'Razón', field: 'tipo' },
                { title: 'Precio', field: 'precio' },
                { title: 'Fecha de transacción', field: 'fecha'},
            ],
            transaccions: [],
            transaccionsObj: [],
        };

    }

    verDatosTransaccion(keyTransaccion)
    {
        const styles = styleArray;
        return this.state.transaccionsObj.map( t => {
            if(t.getkeyTransaccion() === keyTransaccion){
                return(
                    <div key={t.getkeyTransaccion() } style={styles.interiorTabla}>
                        <Paper elevation={3}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <VerifiedUser/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={t.getkeyTransaccion()} secondary={'Key'} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <SwapHoriz/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={t.gettipoTransaccion()} secondary={'Tipo de transacción'} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Today/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={t.getfechaHoraTransaccion()} secondary={'Fecha y hora de transacción'} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MonetizationOn/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={t.getprecioTransaccion()} secondary={'Precio de transacción'} />
                                </ListItem>

                                <div style={styles.interiorTabla}>
                                    { this.verSocio(t.getsocioPrevio(), 'Socio involucrado') }
                                </div>

                                <div style={styles.interiorTabla}>
                                    { this.verVehiculos(t.getvehiculos(), t.gettipoTransaccion()) }
                                </div>

                                {
                                    (t.getsocioSiguente() === null || t.getsocioSiguente() === undefined || t.getsocioSiguente() === '') ?
                                        <div></div>
                                        :
                                        <div style={styles.interiorTabla}>
                                            { this.verSocio(t.getsocioSiguente(), 'Socio involucrado en el cambio de nombre') }
                                        </div>
                                }

                            </List>
                        </Paper>
                    </div>
                )
            } else {
                return null;
            }
        });
    }

    verSocio(s, tipoSocio)
    {
        const styles = styleArray;
        return(
            <Paper elevation={3}>
                <Typography style={styles.interiorTabla}>{tipoSocio}</Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Person/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={s.getFullName()} secondary={'Nombre completo'} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <VerifiedUser/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={s.getCI()} secondary={'Numero de carnet'} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Phone/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={s.getCelular()} secondary={'Celular'} />
                    </ListItem>
                </List>
            </Paper>
        )
    }

    verVehiculos(herramientas, tipo)
    {
        let _herr = [];
        let aux = 0;
        const styles = styleArray;
        for (let h of herramientas){
            _herr.push(h[1]);
        }
        return _herr.map(_h => {
            aux++;
            return(
                <div key={_h.getKeyHerramienta()}>
                    <List key={_h.getKeyHerramienta()} style={styles.expandedStyle}>
                        {
                            (tipo === 'REBAJE DE MODELO' || tipo === 'SUBIDA DE MODELO') ?
                                (
                                    <ListItem>
                                        {
                                            (aux === 1) ?
                                                <ListItemText>Vehículo anterior</ListItemText>
                                                :
                                                <ListItemText>Vehículo actual</ListItemText>
                                        }
                                    </ListItem>
                                )
                                :
                                <div></div>
                        }
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar>
                                    <DirectionsCar/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={_h.getPlaca()} secondary={'Nro. Placa'} />
                        </ListItem>
                    </List>
                </div>

            );
        });
    }

    UNSAFE_componentWillMount()
    {
        let transaccions = [];
        let _transaccions = [];
        const nameref = fireData.ref().child('Transacciones');

        nameref.on('value', (snapshot)=>{
            transaccions = [];
            snapshot.forEach(function (transaccion){
                let t = new TransaccionModel();
                t.dataFireObjSet(transaccion);
                transaccions.push({
                    tipo: t.gettipoTransaccion(),
                    precio: t.getprecioTransaccion(),
                    fecha: t.getfechaHoraTransaccion(),
                    key: t.getkeyTransaccion(),
                });
                _transaccions.push(t);
            });
            this.setState({ transaccions: transaccions, transaccionsObj: _transaccions });
        });
    }



    render()
    {

        return (
            <div>
                <Paper>
                    <MaterialTable
                        title = "Lista de transacciones"
                        columns = {this.state.columns}
                        data = {this.state.transaccions}
                        options = {
                            {
                                headerStyle: {
                                    backgroundColor: '#3F51B5',
                                    color: '#FFF'
                                },
                                rowStyle: {
                                    backgroundColor: '#FFFFFF',
                                },
                                exportButton: true,
                                exportAllData: true,
                            }
                        }
                        detailPanel = { transaccion => {
                            return (this.verDatosTransaccion(transaccion.key))
                        }}
                    />
                </Paper>
            </div>
        );
    }
}

export default ListaTransacciones;