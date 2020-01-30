import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import LocalTaxi from '@material-ui/icons/LocalTaxi';

// import green from '@material-ui/core/colors/green';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import SocioSteper from '../formularios/SocioSteper';
import HerramientaSteper from '../formularios/HerramientaSteper';
// import VerificacionTransaccional from '../formularios/VerificacionTransaccional';
import SocioHerramientasManage from '../../models/socioHerramientaManage';

//notificcacion
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { ValueUpper } from '../../libs/ManageDataValue';

const styleArray = {
    loading:{
        zIndex: 10000000,
        color: '#fff',
    },
    root: {
        width: '100%',
    },
    button: {
        marginTop: '1rem',
        marginRight: '1rem',
    },
    actionsContainer: {
        marginBottom: '1rem',
    },
    resetContainer: {
        padding: '1rem',
    },
    appBar: {
        position: 'relative',
    },
    title:{
        flex: 1,
    },
    ulLi100: {
        flex: 1,
    },
    butoonSave:{
        backgroundColor: 'green',
        color: 'white',
    },
    expandedStyle:{
        boxShadow: '12px 12px 18px 0px #264981',
        margin: '1rem',
    },
}

function getSteps() 
{
    return ['Datos generales del socio', 'Datos de herramienta(s)'];
}

class StepSocios extends Component
{
    
    constructor(props){
        super(props);
        this.addNotification = this.handleRegistrar.bind(this); // notificacion
        this.addNotification = this.handleBind.bind(this); // notificacion
        this.notificationDOMRef = React.createRef(); // notificacion
        this.state = {
            activeButton: true,
            activeStep: 0,
            openModal: false,
            socioData: {},
            herramientaData: [],
            loading: false,
            registrado: false,
        };
    }

    handleBind = (e) =>
    {
        // console.log(e);
        if (e) {
            this.setState({activeButton: false});
            if (e.ci) {
                this.setState({socioData: e});
                this.handleNext();
            } else {
                if (Array.isArray(e)) {
                    // console.log(e);
                    this.setState({herramientaData: e});
                    this.handleNext();
                    this.setState({
                        openModal: true,
                    });
                } else {
                    // console.log('errdr');
                    this.notificationDOMRef.current.addNotification({
                        title: "Validación: Herramienta de trabajo",
                        message: "Error al extraer datos de Herramientas trabajo",
                        type: "danger",
                        insert: "bottom",
                        container: "bottom-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 5000
                        },
                        dismissable: {
                            click: false
                        }
                    });
                }
                
            }
        } else {
            this.notificationDOMRef.current.addNotification({
                title: "Validación: Socios",
                message: "Error al extraer datos de Socio ",
                type: "danger",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000
                },
                dismissable: {
                    click: false
                }
            });
        }
        // console.log(this.state);
    }

    getStepContent(step) 
    {
        switch (step) {
            case 0:
                return (<SocioSteper handleBind={this.handleBind} />);
            case 1:
                return (<HerramientaSteper handleBind={this.handleBind} />);
            // case 2:
            //     return (<VerificacionTransaccional handleBind={this.handleBind} />);
            default:
                return 'Unknown step';
        }
    }

    filtroEjecucion = (event) => 
    {
        switch (this.state.activeStep) 
        {
            case 0:
                // var socio = new SocioSteper();
                // socio.socios();
                // SocioSteper.prototype.socios(this);
                // this.obtenerSocio(event);
                break;
        
            default:console.log('error');
                break;
        }
    };

    obtenerSocio = (event) =>
    {
        console.log(event.target);
    };
    
    handleNext = () => {
        // console.log(this.state.activeStep);
        // console.log(this.state);
        // this.filtroEjecucion(event);
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            registrado: false,
        });
    };

    handleClose = () => {
        this.setState({
            openModal: false,
        });
    };

    handleRegistrar = () => {
        this.setState({loading: true});
        let manageSocio = new SocioHerramientasManage(this.state.socioData, this.state.herramientaData);
        manageSocio.registrar()
        .then( () => {
            this.setState({loading: false, openModal: false, registrado: true});            
            this.notificationDOMRef.current.addNotification({
                title: "Grupo VIKINGOS",
                message: "Socio registrado correctamente.",
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000
                },
                dismissable: {
                    click: false
                }
            });            
        })
        .catch( error => {
            this.setState({loading: false, openModal: false, registrado: true});            
            this.notificationDOMRef.current.addNotification({
                title: "Validación: Herramienta de trabajo",
                message: "Error: " + error,
                type: "danger",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000
                },
                dismissable: {
                    click: false
                }
            });            
        });
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    expandedPanelView(){
        const styles = styleArray;
        return (
            this.state.herramientaData.map( herramienta => 
                <ExpansionPanel expanded={true} key={herramienta.placa} style={styles.expandedStyle}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={herramienta.placa}
                    >
                        <Typography >Vehiculo</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List style={styles.ulLi100}>
                            <ListItem>
                                <ListItemText primary={ValueUpper(herramienta.placa)} secondary="Nro Placa" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={ValueUpper(herramienta.modelo)} secondary="Modelo" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={ValueUpper(herramienta.marca)} secondary="Marca" />
                            </ListItem>
                            <Divider />                          
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        );
    }

    render()
    {
        const steps = getSteps();
        const { activeStep } = this.state;
        const styles = styleArray;

        return(
            <div style={styles.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div>{this.getStepContent(index)}</div>                             
                            <div style={styles.actionsContainer}>
                                <div>
                                    {/* <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        style={styles.button}
                                    >
                                        Atras
                                    </Button>
                                    <Button
                                        disabled={this.state.activeButton}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        style={styles.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                    </Button> */}
                                </div>
                            </div>
                        </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                <Paper square elevation={0} style={styles.resetContainer}>
                    <Typography>Datos completados</Typography>
                    <Button onClick={this.handleReset} style={styles.button}>
                        Reiniciar formulario
                    </Button>
                    <Button disabled={this.state.registrado} onClick={()=>this.setState({openModal:true})} style={styles.button} variant='contained' color='primary'>
                        Confirmar registro
                    </Button>
                    <Dialog fullScreen open={this.state.openModal} onClose={this.handleClose} TransitionComponent={this.Transition}>
                        <AppBar style={styles.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" style={styles.title}>
                                    DATOS DEL REGISTRO
                                </Typography>
                                <Button autoFocus style={styles.butoonSave} onClick={this.handleRegistrar}>
                                    Guardar
                                    <Save />
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <List>
                            <ListItem>
                                <ListItemText primary={ValueUpper(this.state.socioData.nombres)} secondary="Nombres" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={ValueUpper(this.state.socioData.apellidos)} secondary="Apellidos" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={ValueUpper(this.state.socioData.ci)} secondary="Cedula de identidad" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={ValueUpper(this.state.socioData.celular)} secondary="Celular" />
                            </ListItem>
                            <Divider />                            
                        </List>
                        { this.expandedPanelView() }
                    </Dialog>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <Backdrop style={styles.loading} open={this.state.loading}>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </Paper>
                )}
            </div>
        );
    }
}

export default StepSocios;