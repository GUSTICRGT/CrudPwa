import React, { Component } from 'react';
//Material
import Grid from '@material-ui/core/Grid';
import {Paper, CardMedia, CircularProgress, Backdrop} from '@material-ui/core';
// import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import {
    MuiThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";

//Components
import LabelTitle from '../../components/labels/LabelTitle';
import InputIcon from '../../components/inputs/InputIcon';
import InputPassword from '../../components/inputs/InputPassword';
import ButtonSubmit from '../../components/Buttons/ButtonSubmit';
//multimedia
import Logo  from '../../assets/img/design/logOf.png';
//firebase
import {fireAuth} from '../../config/fire';
//notifications
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";


const styleArray = {
    paper: {
        padding: '0rem',
        textAlign: 'center',
        //color: 'black',
        border: '4px solid rgb(32, 123, 214)',
    },
    media: {
        height: 0,
        paddingTop: '85%', // 16:9
    },
    formulario: {
        padding: "1rem",
    },
    loading: {
        zIndex: 10000000,
        color: '#fff',
    },
};

const theme = createMuiTheme({
    palette: {
      primary: blue
    },
    typography: { useNextVariants: true }
});

class LoginForm extends Component 
{

    constructor(props)
    {
        super(props);
        // this.login = this.login.bind(this);
        // this.onChange = this.onChange.bind(this);
        this.state={
            loading: false,
            usuario:'',
            clave:'',
        };
        //notifications
        this.addNotification = this.login.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    onChange(field, value) 
    {
        this.setState({[field]: value});        
        // console.log(this.state.usuario+" --- ",this.state.clave);
    }

    login(e)
    {
        this.setState({loading: true});
        e.preventDefault();
        fireAuth.signInWithEmailAndPassword(this.state.usuario, this.state.clave).then((u) => 
        {
            this.setState({loading: false});
            localStorage.setItem('user', u.user.uid);
            
        }).catch((error) => 
        {
            this.setState({loading: false});
            this.notificationDOMRef.current.addNotification({
                title: "Error en autentificación",
                message: ((error.code === "auth/user-not-found") || (error.code === "auth/invalid-email")) ? "Usuario no registrado" : "Contraseña incorrecta" ,
                type: "danger",
                insert: "bottom",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: { duration: 4000 },
                dismissable: { click: false }
            });
        });
    }

    render()
    {
        const styles = styleArray;
        return(
            <Grid item xs>
                <Paper style={styles.paper}>
                    
                    <CardMedia
                        style={styles.media}
                        image={Logo}
                        title="Vikingos logo"
                    />

                    <div style={styles.formulario}>
                        <LabelTitle v="h5" c="h3" text="Ingresar a VIKINGOS" />
                        
                        <form onSubmit={this.login.bind(this)}>
                            <MuiThemeProvider theme={theme}>
                                <InputIcon 
                                    idName = "usuario"
                                    estado = {false}
                                    requerido = {true}
                                    error = {false}
                                    labelText = "Usuario"
                                    helperText = "*requerido"
                                    margin = "normal"
                                    nameIcon = "account_circle"

                                    onChange={this.onChange.bind(this)}
                                />
                                <InputPassword 
                                    idName = "clave"
                                    estado = {false}
                                    requerido = {true}
                                    error = {false}
                                    labelText = "Contraseña"
                                    helperText = "*requerido"
                                    margin = "normal"
                                    nameIcon = "lock"
                                    onChange={this.onChange.bind(this)}
                                />
                                <ReactNotification ref={this.notificationDOMRef} />
                                <ButtonSubmit 
                                    color="primary"
                                    v="contained"
                                    text="Ingresar"

                                    onClick={this.login}
                                />
                            </MuiThemeProvider>
                        </form>                        
                    </div>
                </Paper>
                <Backdrop style={styles.loading} open={this.state.loading}>
                    <CircularProgress color="primary" />
                </Backdrop>
            </Grid>
        );
    }
}

export default LoginForm;