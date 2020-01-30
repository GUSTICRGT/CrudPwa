import React, { Component } from 'react';

import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Card,
    CardHeader,
    CardMedia,
} from '@material-ui/core';

import CambioNombre from '../formularios/CambioNombre';
import CambioVehiculo from '../formularios/CambioVehiculo';
import NuevoVehiculo from '../formularios/NuevoVehiculo';
import EliminarVehiculo from '../formularios/EliminarVehiculo';

import TransaccionesImage from '../../assets/img/design/transacciones.jpg';
import NotFound from '../../assets/img/design/notfound.jpg';

const styleArray = {
    root: {
        width: '100%',
    },
    paperPadding: {
        padding: '1rem',
    },
    mediaTransaccion: {
        paddingTop: '50%',
    },
}

class TransaccionesDashboard extends Component 
{

    constructor(props)
    {
        super(props);
        this.state = {
            tipoTransaccion: '',
        };
    }

    cambiarTipo = (e) => {
        this.setState({tipoTransaccion: e.target.value});
    }

    containerTransaccion = () => {
        var componente;
        switch (this.state.tipoTransaccion) 
        {
            case '':
                componente = this.compVacio();
                break;
            
            case '1':
                componente = <CambioNombre/>;
                break;

            case '2':
                componente = <CambioVehiculo/>;
                break;

            case '3':
                componente = <NuevoVehiculo/>;
                break;

            case '4':
                componente = <EliminarVehiculo/>;
                break;
            
            default:
                componente = this.compVacio(this.state.tipoTransaccion);
                break;
        }       
        return componente; 
    }

    compVacio(tipo)
    {
        const styles = styleArray;
        return (
            <Card>
                <CardHeader 
                    title="Transacciones" 
                    subheader={(tipo===undefined) ? "Seleccione un tipo de transacción" : "Error al seleccionar (Puede que la opción no este disponible)"}
                >
                </CardHeader>
                <CardMedia
                    style={styles.mediaTransaccion}
                    image={(tipo===undefined) ? TransaccionesImage : NotFound }
                    title="Transacciones"
                />
            </Card>
            );
    }

    render() 
    {
        const styles = styleArray;
        return (
            <div style={styles.root}>
                <Paper style={styles.paperPadding}>
                    <Typography variant="h5" align="center" >Formulario de transacciones</Typography>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel ref={0} id="demo-simple-select-outlined-label">
                            Tipo de transacción
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.tipoTransaccion}
                            onChange={this.cambiarTipo}
                            variant="outlined"
                            labelWidth={200}
                        >
                            <MenuItem value=''>
                                <em>Tipo de transacción</em>
                            </MenuItem>
                            <MenuItem value={'1'}>Cambio de nombre</MenuItem>
                            <MenuItem value={'2'}>Cambio de vehículo</MenuItem>
                            <MenuItem value={'3'}>Nuevo vehículo</MenuItem>
                            <MenuItem value={'4'}>Eliminar vehículo</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={styles.paperPadding}>
                        {this.containerTransaccion()}
                    </div>
                </Paper>
            </div>
        );
    }
}

export default TransaccionesDashboard;