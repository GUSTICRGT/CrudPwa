import React, { Component } from 'react';
import { Grid, Paper, MuiThemeProvider, createMuiTheme, Button } from '@material-ui/core';
import LabelTitle from '../../components/labels/LabelTitle';
import InputIcon from '../../components/inputs/InputIcon';
import blue from "@material-ui/core/colors/blue";
import InputSwitch from '../../components/inputs/InputSwitch';

import { BoolValuesEmpty } from '../../libs/ManageDataValue';

//notificcacion
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const styleArray = {
    paper: {
        padding: '0rem',
        textAlign: 'center',
        //color: 'black',
        border: '1px solid #3F51B5',
    },
    media: {
        height: 0,
        paddingTop: '85%', // 16:9
    },
    btnPadding: {
        margin: "1rem",
    }
};

const theme = createMuiTheme({
    palette: {
      primary: blue
    },
    typography: { useNextVariants: true }
});

class HerramientaSteper extends Component
{

    HerramientasList = [];
    constructor(props)
    {
        super(props);
        this.addNotification = this.addHerramienta.bind(this); // notificacion
        this.addNotification = this.clickSubmit.bind(this); // notificacion
        this.notificationDOMRef = React.createRef(); // notificacion
        this.state={
            linea: false,
            placa: '',
            modelo: '',
            marca: '',
        };
    }

    onChange(field, value) 
    {
        const linea = (field === 'linea') ? ((this.state.linea) ? false : true ): null;
        this.setState({[field]: (field === 'linea') ? linea : value}); 
        // console.log(this.state.linea+" --- ");
    }

    clickSubmit = () => {
        if (this.HerramientasList.length !== 0) {
            if (this.state.marca !== '' && this.state.placa !== '' && this.state.modelo !== '' ) {
                if (!this.addHerramienta()) {
                    this.props.handleBind(this.HerramientasList);
                    this.HerramientasList = [];
                } 
            }
            else {
                this.props.handleBind(this.HerramientasList);
                this.HerramientasList = [];
            }            
        } else {
            this.notificationDOMRef.current.addNotification({
                title: "Validación: Herramienta de trabajo",
                message: "Agrege una herramiento de trabajo",
                type: "danger",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 4000
                },
                dismissable: {
                    click: false
                }
            });
        }        
    }

    addHerramienta = () => {
        var resp = this.validate();
        var returnErrorAdd = false;
        if (resp == null) {            
            if (!this.herramientaRepetida(this.state.placa)){
                this.HerramientasList.push(this.state);
                this.resetForm();
            } else {
                returnErrorAdd = true;
                this.notificationDOMRef.current.addNotification({
                    title: "Validación: Herramienta de trabajo",
                    message: "Error: Nro. placa repetida",
                    type: "danger",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 4000
                    },
                    dismissable: {
                        click: false
                    }
                });
            }
                        
        } else {
            this.notificationDOMRef.current.addNotification({
                title: "Validación: Herramienta de trabajo",
                message: resp + ", esta vacio.",
                type: "danger",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 4000
                },
                dismissable: {
                    click: false
                }
            });
        }
        return returnErrorAdd;        
    }

    herramientaRepetida(placa) {
        var repetido = false;
        this.HerramientasList.forEach(herramienta => {
            if (herramienta.placa===placa) {
                repetido = true ;
            }
        });
        return repetido;
    }

    resetForm() {
        this.setState({
            linea: false,
            placa: '',
            modelo: '',
            marca: '',
        });
    }

    validate() {
        var respValidate = BoolValuesEmpty({
            'Linea nueva': this.state.linea,
            'Placa': this.state.placa,
            'Modelo': this.state.modelo,
            'Marca': this.state.marca,
        });
        return respValidate;
    }

    render()
    {
        const styles = styleArray;
        return(
            <Grid container>
                <Grid item xs>
                    <Paper style={styles.paper}>
                        <div style={styles.formulario}>
                            <LabelTitle v="h5" c="h3" text="Datos del minibus" />
                            <form >
                                <MuiThemeProvider theme={theme}>
                                    <InputIcon 
                                        idName = "placa"
                                        estado = {false}
                                        requerido = {true}
                                        error = {false}
                                        labelText = "Nº de Placa"
                                        helperText = "*requerido"
                                        margin = "normal"
                                        nameIcon = "filter_1"
                                        value = {this.state.placa}
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <InputIcon 
                                        idName = "modelo"
                                        estado = {false}
                                        requerido = {false}
                                        error = {false}
                                        labelText = "Modelo"
                                        helperText = "ej: 2019"
                                        margin = "normal"
                                        nameIcon = "looks_one"
                                        value = {this.state.modelo}
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <InputIcon 
                                        idName = "marca"
                                        estado = {false}
                                        requerido = {false}
                                        error = {false}
                                        labelText = "Marca"
                                        helperText = "ej: Toyota"
                                        margin = "normal"
                                        nameIcon = "panorama_wide_angle"
                                        value = {this.state.marca}
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <InputSwitch
                                        idName = "linea"
                                        lblText = "Nueva linea"
                                        color = "primary"
                                        txtTooltip = "Activar en caso de que la herramienta de trabajo no sea una segunda herramienta, si no parte de otra línea."
                                        value = {this.state.linea}
                                        onChange = {this.onChange.bind(this)}
                                    />
                                    <br/>
                                    <br/>
                                    <Button
                                        style = {styles.btnPadding}
                                        color = "primary"
                                        variant = "outlined"
                                        onClick = { this.addHerramienta }
                                    >
                                        {
                                            (this.HerramientasList.length === 0) ? 'Agregar' : 'Nueva herramienta'
                                        }
                                    </Button>
                                    <Button
                                        style = {styles.btnPadding}
                                        color = "primary"
                                        variant = "contained"
                                        onClick = { this.clickSubmit }
                                    >
                                        Confirmar
                                    </Button>
                                    <br/>
                                    <br/>
                                </MuiThemeProvider>
                            </form>                        
                        </div>                    
                        <ReactNotification ref={this.notificationDOMRef} />
                    </Paper>     
                </Grid>
            </Grid>
        );
    }
}

export default HerramientaSteper;