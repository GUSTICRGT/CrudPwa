import React, { Component } from 'react';
import { Grid, Paper, MuiThemeProvider, createMuiTheme, Button } from '@material-ui/core';
import LabelTitle from '../../components/labels/LabelTitle';
import InputIcon from '../../components/inputs/InputIcon';
import blue from "@material-ui/core/colors/blue";

import { BoolValuesEmpty } from '../../libs/ManageDataValue';

//date picker
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

//notificcacion
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const styleArray = {
    paper: {
        padding: '1rem',
        textAlign: 'center',
        //color: 'black',
        border: '1px solid #3F51B5',
    },
    media: {
        height: 0,
        paddingTop: '85%', // 16:9
    },
    formulario: {
        //padding: "1rem",
    }
};

const theme = createMuiTheme({
    palette: {
      primary: blue
    },
    typography: { useNextVariants: true }
});

class SocioSteper extends Component
{

    
    constructor(props)
    {
        super(props);
        this.addNotification = this.clickSubmit.bind(this); // notificacion
        this.notificationDOMRef = React.createRef(); // notificacion
        this.state = {
            nombres: '',
            apellidos: '',
            ci: '',
            celular: '',
            fechaIngreso: new Date(),
        }
    }
    

    onChange(field, value) 
    {
        this.setState({[field]: value});        
    }

    clickSubmit = (e) => {
        e.preventDefault();
        var resp = this.validate();
        if (resp == null) {
            this.props.handleBind(this.state);  
            this.resetForm();          
        } else {
            this.notificationDOMRef.current.addNotification({
                title: "Validación: Datos generales",
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
    }

    resetForm(){
        this.setState({
            nombres: '',
            apellidos: '',
            ci: '',
            celular: '',
        });
    }

    validate() {
        var respValidate = BoolValuesEmpty(
            {
                'Nombres': this.state.nombres,
                'Apellidos': this.state.apellidos,
                'Cedula de identidad': this.state.ci,
                'Número de celular': this.state.celular,
                'Fecha de ingreso' : this.state.fechaIngreso,
            }
        );
        return respValidate;
    }

    handleDateChange = date => {
        this.setState({fechaIngreso: date});
    };

    render()
    {
        const styles = styleArray;
        return(
            <Grid container>
                <Grid item xs>
                    <Paper style={styles.paper}>
                        <div style={styles.formulario}>
                            <LabelTitle v="h5" c="h3" text="Datos generales" />
                            <form >
                                <MuiThemeProvider theme={theme}>
                                    <InputIcon 
                                        idName = "nombres"
                                        estado = {false}
                                        requerido = {true}
                                        error = {false}
                                        labelText = "Nombre(s)"
                                        helperText = "*requerido"
                                        margin = "normal"
                                        nameIcon = "person"
                                        value = {this.state.nombres}
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <InputIcon 
                                        idName = "apellidos"
                                        estado = {false}
                                        requerido = {true}
                                        error = {false}
                                        labelText = "Apellido(s)"
                                        helperText = "*requerido"
                                        margin = "normal"
                                        nameIcon = "person"
                                        value = {this.state.apellidos}
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <InputIcon 
                                        idName = "ci"
                                        estado = {false}
                                        requerido = {true}
                                        error = {false}
                                        labelText = "CI"
                                        helperText = "*requerido (ej: 123456 Or.)"
                                        margin = "normal"
                                        nameIcon = "security"
                                        value = {this.state.ci}
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <InputIcon 
                                        idName = "celular"
                                        estado = {false}
                                        requerido = {true}
                                        error = {false}
                                        labelText = "Celular"
                                        helperText = "*requerido"
                                        margin = "normal"
                                        nameIcon = "phone"
                                        value = {this.state.celular}
                                        onChange={this.onChange.bind(this)}
                                    />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        < KeyboardDatePicker
                                            inputVariant = "outlined"
                                            margin = "normal"
                                            id = "date-picker-fecha"
                                            label = "Fecha de ingreso"
                                            format = "dd/MM/yyyy"
                                            value = { this.state.fechaIngreso }
                                            onChange = { this.handleDateChange }
                                            KeyboardButtonProps = {
                                                {
                                                    'aria-label': 'cambiar fecha',
                                                }
                                            }
                                        />
                                    </MuiPickersUtilsProvider>
                                    <br />
                                    <br />
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="outlined"
                                        onClick={ this.clickSubmit }
                                    >
                                        Siguiente
                                    </Button>
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

export default SocioSteper;