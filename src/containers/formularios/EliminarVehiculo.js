import React, { Component } from 'react';

// Imports Core
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Slide,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Backdrop,
    CircularProgress,
    Paper,
} from '@material-ui/core';

// Imports Icons
import {
    ArrowForwardIos,
    Close as CloseIcon,
    Save,
} from '@material-ui/icons'

// Imports Styles
import {
    createMuiTheme, /*emphasize,*/
    ThemeProvider,
} from '@material-ui/core/styles';

// Date Picker
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// Import Colors
import {
    green,
    red
} from "@material-ui/core/colors";

// Notificcacion
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';

// Libs
import {
    ValueUpper,
} from "../../libs/ManageDataValue";

// Models
import SocioModel from '../../models/socio';
import TransaccionesManage from "../../models/transaccionesManage";

// Firebase DATA
import {
    fireData,
} from '../../config/fire';

// Components
import InputIcon from "../../components/inputs/InputIcon";

// Styles
const styleArray = {
    root: {
        width: '100%',
    },
    paper: {
        padding: '1rem',
        textAlign: 'center',
        border: '1px solid #3F51B5',
    },
    paperError: {
        padding: '1rem',
        textAlign: 'center',
        border: '1px solid red',
    },
    colorTextError: {
        color: 'red',
    },
    loading: {
        zIndex: 10000000,
        color: '#fff',
    },
    ulLi100: {
        flex: 1,
    },
    title: {
        flex: 1,
    },
    expandedStyleError:{
        boxShadow: '12px 12px 18px 0px red',
        margin: '1rem',
    },
    expandedStyleSuccess:{
        boxShadow: '12px 12px 18px 0px green',
        margin: '1rem',
    },
    appBar: {
        position: 'relative',
    },
    butoonSave: {
        backgroundColor: 'green',
        color: 'white',
    },
};

const themeButonTransaccion = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
    },
});

class EliminarVehiculo extends Component
{

    constructor(props)
    {

        super(props);

        this.addNotification = this.handleRegistrarCambio.bind(this); // notificacion
        this.notificationDOMRef = React.createRef(); // notificacion

        this.state = {
            socios: [], //lista de socios
            socio: '', //el dato del socio seleccionado
            socioSelect: null, // el objeto SOCIO seleccionado
            vehiculos: [], // lista de vehiculos
            vehiculo: '',
            vehiculoSelected: null, //vehiculos seleccionados
            fechaTransaccion: new Date(),
            precio: 50,
            openModal: false,
            loading: false,
        };
    }

    UNSAFE_componentWillMount()
    {
        let socios = [];
        const nameref = fireData.ref().child('Socios');

        nameref.on('value', (snapshot) => {
            socios = [];
            snapshot.forEach(function (socio) {
                let s = new SocioModel();
                s.dataFireObjSet(socio);
                socios.push(s);
            });
            this.setState({
                socios
            });
        });
    }

    llenarSelect()
    {
        return this.state.socios.map( s =>
            <MenuItem key={s.getCI()} value={s.getKey()}>{s.getShortName()}</MenuItem>
        );
    }

    llenarSelectVehiculo()
    {
        return this.state.vehiculos.map( v =>
            <MenuItem key={v.getKeyHerramienta()} value={v.getPlaca()}>{v.getPlaca()}</MenuItem>
        );
    }

    cambiarSocio = (e) => {
        let vehiculos = [];
        this.setState({socio: e.target.value});
        this.state.socios.forEach(s => {
            if (s.getKey() === e.target.value) {
                s.getherramientas().forEach(vehiculo => {
                    vehiculos.push(vehiculo);
                });
                this.setState({socioSelect: s, vehiculos: vehiculos, vehiculo: '', vehiculoSelected: null});
            }
        });
    }

    cambiarVehiculo = (e) => {
        this.setState({vehiculo: e.target.value});
        this.state.vehiculos.forEach( v => {
            if (v.getPlaca() === e.target.value) {
                this.setState({vehiculoSelected: v});
            }
        });
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    handleBindVehiculo = (e) => {
        this.setState({newVehiculo: e[e.length-1]});
    }

    onChangeData(field, value) {
        this.setState({
            [field]: value
        });
    }

    handleDateChange = date => {
        this.setState({
            fechaTransaccion: date
        });
    };

    handleModelClose = () => {
        this.setState({openModal: false});
    }

    handleRegistrarCambio = () => {
        this.setState({loading:true});
        let _socioSelect = this.state.socioSelect;
        let _vehiculoSelected = this.state.vehiculoSelected;
        let cambioNombreTransaccion = new TransaccionesManage(_socioSelect);

        cambioNombreTransaccion.fechaTransaccion = this.state.fechaTransaccion;
        cambioNombreTransaccion.precioTransaccion = this.state.precio;
        cambioNombreTransaccion.eliminarVehiculoTransaccion(_vehiculoSelected)
            .then(() => {
                this.notificationDOMRef.current.addNotification({
                    title: "<< TRANSACCIÓN >>",
                    message: "Se elimino el vehículo correctamente",
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
                this.setState({ loading:false, socio: '', socioSelect: null,  vehiculoSelected: [], openModal: false, fechaTransaccion: new Date(), precioTransaccion: 50 });
            })
            .catch(e => {
                this.notificationDOMRef.current.addNotification({
                    title: "Validación: << Transacción >>",
                    message: "Error: " + e,
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

    render()
    {
        const styles = styleArray;
        return (
            <div style={styles.root}>
                <Card style={styles.paper}>
                    <CardHeader
                        title={"Eliminación de vehículo"}
                        subheader={"Transacciones"}
                    >
                    </CardHeader>
                    <CardContent>
                        <br/>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel ref={0} id="inputVehiculoNuevoLabel">
                                Seleccione un socio
                            </InputLabel>
                            <Select
                                labelId="inputVehiculoNuevoLabelSelect"
                                id="inputVehiculoNuevoSelect"
                                value={this.state.socio}
                                onChange={this.cambiarSocio}
                                variant="outlined"
                                labelWidth={200}
                            >
                                <MenuItem key='null' value=''>
                                    <em>Seleccione un socio</em>
                                </MenuItem>
                                {this.llenarSelect()}
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>
                        {
                            (this.state.socio === '') ?
                                <Typography style={styles.colorTextError}>Seleccione un socio</Typography>
                                :
                                (
                                    <div>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel ref={0} id="inputVehiculoLabel">
                                                Seleccione un vehículo
                                            </InputLabel>
                                            <Select
                                                labelId="inputVehiculoLabelSelect"
                                                id="inputVehiculoSelect"
                                                value={this.state.vehiculo}
                                                onChange={this.cambiarVehiculo}
                                                variant="outlined"
                                                labelWidth={250}
                                            >
                                                <MenuItem key='null' value=''>
                                                    <em>Seleccione un vehículo</em>
                                                </MenuItem>
                                                {this.llenarSelectVehiculo()}
                                            </Select>
                                        </FormControl>
                                        <br/>
                                        <br/>
                                        {
                                            (this.state.vehiculoSelected === null || this.state.vehiculo === '') ?
                                                <Typography style={styles.colorTextError}>Seleccione un vehículo</Typography>
                                                :
                                                (
                                                    <div>
                                                        <ExpansionPanel expanded={true} key={this.state.vehiculoSelected.getPlaca()} style={styles.expandedStyleError}>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ArrowForwardIos />}
                                                                id={this.state.vehiculoSelected.getPlaca()}
                                                            >
                                                                <Typography >Vehiculo</Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                                <List style={styles.ulLi100}>
                                                                    <ListItem>
                                                                        <ListItemText primary={ValueUpper(this.state.vehiculoSelected.getPlaca())} secondary="Nro Placa" />
                                                                    </ListItem>
                                                                    <Divider />
                                                                    <ListItem>
                                                                        <ListItemText primary={ValueUpper(this.state.vehiculoSelected.getModelo())} secondary="Modelo" />
                                                                    </ListItem>
                                                                    <Divider />
                                                                    <ListItem>
                                                                        <ListItemText primary={ValueUpper(this.state.vehiculoSelected.getMarca())} secondary="Marca" />
                                                                    </ListItem>
                                                                    <Divider />
                                                                </List>
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                        <br/>
                                                        <br/>
                                                        <Paper style={styles.paperError}>
                                                            <Typography style={styles.colorTextError}>Datos de transacción</Typography>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDatePicker
                                                                    inputVariant = "outlined"
                                                                    margin = "normal"
                                                                    id = "date-picker-fecha"
                                                                    label = "Fecha de transaccion"
                                                                    format = "dd/MM/yyyy"
                                                                    value = { this.state.fechaTransaccion }
                                                                    name = "fechaTransaccion"
                                                                    onChange = { this.handleDateChange }
                                                                    KeyboardButtonProps = {
                                                                        {
                                                                            'aria-label': 'cambiar fecha',
                                                                        }
                                                                    }
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                            <InputIcon
                                                                idName = "precio"
                                                                estado = { false }
                                                                requerido = { true }
                                                                error = { true }
                                                                labelText = "Precio de transacción"
                                                                helperText = "Monto en BOLIVIANOS (Bs.). Ej: 50"
                                                                margin = "normal"
                                                                nameIcon = "monetization_on"
                                                                value = { this.state.precio }
                                                                onChange={this.onChangeData.bind(this)}
                                                            />
                                                            <br/>
                                                            <br/>
                                                            <ThemeProvider theme={themeButonTransaccion}>
                                                                <Button
                                                                    color="secondary"
                                                                    variant="contained"
                                                                    onClick={ () => this.setState({ openModal: true}) }
                                                                >
                                                                    Siguiente
                                                                </Button>
                                                            </ThemeProvider>
                                                        </Paper>
                                                        <Dialog fullScreen open={this.state.openModal} TransitionComponent={this.Transition}>
                                                            <AppBar style={styles.appBar}>
                                                                <Toolbar>
                                                                    <IconButton edge="start" color="inherit" onClick={this.handleModelClose} aria-label="close">
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                    <Typography variant="h6" style={styles.title}>
                                                                        DATOS DE ELIMINACIÓN DE VEHÍCULO
                                                                    </Typography>
                                                                    <Button autoFocus style={styles.butoonSave} onClick={this.handleRegistrarCambio}>
                                                                        Guardar
                                                                        <Save />
                                                                    </Button>
                                                                </Toolbar>
                                                            </AppBar>
                                                            <Typography align={'center'} color={'primary'} variant={'h3'} >{ 'Eliminación de vehículo' }</Typography>
                                                            <List>
                                                                <ListItem>
                                                                    <ListItemText primary={ValueUpper(this.state.socioSelect.getShortName())} secondary="Nombres" />
                                                                </ListItem>
                                                                <Divider />
                                                                <ListItem>
                                                                    <ListItemText primary={ValueUpper(this.state.socioSelect.getCI())} secondary="Cedula de identidad" />
                                                                </ListItem>
                                                                <Divider />
                                                                <ListItem>
                                                                    <ListItemText primary={ValueUpper(this.state.socioSelect.getCelular())} secondary="Celular" />
                                                                </ListItem>
                                                                <Divider />
                                                            </List>
                                                            <ExpansionPanel expanded={true} key={this.state.vehiculoSelected.getPlaca()} style={styles.expandedStyleError}>
                                                                <ExpansionPanelSummary
                                                                    expandIcon={<ArrowForwardIos />}
                                                                    id={this.state.vehiculoSelected.getPlaca()}
                                                                >
                                                                    <Typography >Vehiculo</Typography>
                                                                </ExpansionPanelSummary>
                                                                <ExpansionPanelDetails>
                                                                    <List style={styles.ulLi100}>
                                                                        <ListItem>
                                                                            <ListItemText primary={ValueUpper(this.state.vehiculoSelected.getPlaca())} secondary="Nro Placa" />
                                                                        </ListItem>
                                                                        <Divider />
                                                                        <ListItem>
                                                                            <ListItemText primary={ValueUpper(this.state.vehiculoSelected.getModelo())} secondary="Modelo" />
                                                                        </ListItem>
                                                                        <Divider />
                                                                        <ListItem>
                                                                            <ListItemText primary={ValueUpper(this.state.vehiculoSelected.getMarca())} secondary="Marca" />
                                                                        </ListItem>
                                                                        <Divider />
                                                                    </List>
                                                                </ExpansionPanelDetails>
                                                            </ExpansionPanel>
                                                        </Dialog>
                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                        }
                    </CardContent>
                </Card>
                <ReactNotification ref={this.notificationDOMRef} />
                <Backdrop style={styles.loading} open={this.state.loading}>
                    <CircularProgress color="primary" />
                </Backdrop>
            </div>
        )
    }
}

export default EliminarVehiculo;