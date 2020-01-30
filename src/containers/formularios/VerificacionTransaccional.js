import React, { Component } from 'react';
import { Grid, Paper, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import LabelTitle from '../../components/labels/LabelTitle';
import InputIcon from '../../components/inputs/InputIcon';
import { blue } from '@material-ui/core/colors';

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
    formulario: {
        padding: "1rem",
    }
};

const theme = createMuiTheme({
    palette: {
      primary: blue
    },
    typography: { useNextVariants: true }
});

class VerificacionTransaccional extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            verificacion: '',
        }
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    render()
    {
        const styles = styleArray;
        return(
            <Grid container>
                <Grid item xs>
                    <Paper style={styles.paper}>
                        <div style={styles.formulario}>
                            <LabelTitle v="h5" c="h3" text="Verificacíon de transaccíon" />
                            <form >
                                <MuiThemeProvider theme={theme}>
                                    <InputIcon 
                                        idName = "transaccion"
                                        estado = {false}
                                        requerido = {true}
                                        error = {false}
                                        labelText = "Ingrese el número de verificacíon"
                                        helperText = "*requerido"
                                        margin = "normal"
                                        nameIcon = "filter_1"
                                        adorn={true}
                                        adornIco = "contact_support"
                                        adornTooltip = "El codigode verificacion se enviara al numero de telefono del socio."
                                        adornPosition = "end"
                                        adornPositionVar = "endAdornment"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </MuiThemeProvider>
                            </form>                        
                        </div>                 
                    </Paper>     
                </Grid>
            </Grid>
        );
    }
}

export default VerificacionTransaccional;
