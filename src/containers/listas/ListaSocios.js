import React, { Component } from "react";
import MaterialTable from "material-table";
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core';

import { fireData } from '../../config/fire';

import SocioModel from '../../models/socio';

import {
    Person,
    VerifiedUser,
    Phone,
    DirectionsCar,
} from '@material-ui/icons';

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

class ListaSocios extends Component 
{
 
    constructor(props)
    {
        super(props);
        this.state = {            
            columns: [
                { title: 'Socio', field: 'nombres' },
                { title: 'CI', field: 'ci' },
                { title: 'Celular', field: 'celular'},
                { title: 'Fecha ingreso', field: 'fechaIngreso'},
            ],
            socios: [],
            sociosObj: [],
        };          
                
    }

    verDatosSocio(ci)
    {
        const styles = styleArray;
        return this.state.sociosObj.map( s => {
            if(s.getCI() === ci){
                return(
                    <div key={s.getKey()} style={styles.interiorTabla}>
                        <Paper elevation={3}>
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
                                <div style={styles.interiorTabla}>
                                    { this.verVehiculos(s.getherramientas()) }
                                </div>
                            </List>
                        </Paper>
                    </div>
                )
            } else {
                return null;
            }
        });
    }

    verVehiculos(herramientas)
    {
        let _herr = [];
        const styles = styleArray;
        for (let h of herramientas){
            _herr.push(h[1]);
        }

        return _herr.map(_h => {
            return(
                <List key={_h.getKeyHerramienta()} style={styles.expandedStyle}>
                    <ListItem >
                        <ListItemAvatar>
                            <Avatar>
                                <DirectionsCar/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={_h.getPlaca()} secondary={'Nro. Placa'} />
                    </ListItem>
                </List>
            );
        });
    }

    UNSAFE_componentWillMount()
    {
        // const styles = styleArray;
        let socios = [];
        let _socios = [];
        const nameref = fireData.ref().child('Socios');

        nameref.on('value', (snapshot)=>{
            socios = [];
            snapshot.forEach(function (socio){
                let s = new SocioModel();
                s.dataFireObjSet(socio);
                socios.push({
                    nombres: s.getShortName(),
                    ci: s.getCI(),
                    celular: s.getCelular(),
                    fechaIngreso: s.getFechaIngreso(),
                });
                _socios.push(s);
            });
            this.setState({ socios: socios, sociosObj:_socios });
        });
    }



    render()
    {

        return (
            <div>
                <Paper>
                    <MaterialTable
                        title = "Lista de socios"
                        columns = {this.state.columns}
                        data = {this.state.socios}
                        options={
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
                        detailPanel={rowData =>{
                            // console.log(rowData);
                            return (this.verDatosSocio(rowData.ci))
                        }}
                    />
                </Paper>
            </div>
        );
    }
}

export default ListaSocios;