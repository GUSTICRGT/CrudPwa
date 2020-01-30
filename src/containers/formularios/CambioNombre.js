import React, { Component } from 'react';

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Checkbox,
    TextField,
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
    FormControlLabel,
    Switch,
    Backdrop,
    CircularProgress,
    Paper,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import {
    CheckBoxOutlineBlank,
    CheckBox,
    Close as CloseIcon,
    Save,
    ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

import { fireData } from '../../config/fire';
import SocioModel from '../../models/socio';
import TransaccionesManage from '../../models/transaccionesManage';

import {
    ValueUpper,
} from '../../libs/ManageDataValue';

import SocioSteper from '../formularios/SocioSteper';

import InputIcon from '../../components/inputs/InputIcon';

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

import {
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core/styles';

import {
    red,
    green,
    deepPurple,
} from '@material-ui/core/colors';

const styleArray = {
    root: {
        width: '100%',
    },
    paperPadding: {
        padding: '1rem',
    },
    butoonSave: {
        backgroundColor: 'green',
        color: 'white',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
    ulLi100: {
        flex: 1,
    },
    expandedStyle:{
        boxShadow: '12px 12px 18px 0px #264981',
        margin: '1rem',
    },
    paper: {
        padding: '1rem',
        textAlign: 'center',
        border: '1px solid #3F51B5',
    },
    paperError: {
        padding: '1rem',
        textAlign: 'center',
        //color: 'black',
        border: '1px solid red',
    },
    colorTextError: {
        color: 'red',
    },
    loading: {
        zIndex: 10000000,
        color: '#fff',
    },
}

const themeButonTransaccion = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
    },
});

const themeCheckBox = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: red,
    },
});

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

class CambioNombre extends Component
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
            newSocioSelect: null, // el objeto NUEVO SOCIO seleccionado
            vehiculos: [], // lista de vehiculos
            vehiculosSelected: [], //vehiculos seleccionados
            openModal: false,
            switchExitSocio: false,
            socioExisteAsign: '',
            socioExisteAsignSelect: null,
            loading:false,
            precio: 50,
            fechaTransaccion: new Date(),
            socioStepData: null,
        };
    }

    UNSAFE_componentWillMount()
    {
        let socios = [];
        const nameref = fireData.ref().child('Socios');

        nameref.on('value', (snapshot)=>{
            socios = [];
            snapshot.forEach(function (socio){
                let s = new SocioModel();
                s.dataFireObjSet(socio);
                socios.push(s);
            });
            this.setState({ socios });
        });
    }

    cambiarSocio = (e) => {
        let vehiculos = [];
        this.setState({socio: e.target.value, socioExisteAsign: ''});
        this.state.socios.forEach(s => {
            if (s.getKey() === e.target.value) {
                s.getherramientas().forEach(vehiculo => {
                    vehiculos.push(vehiculo);
                });
                this.setState({socioSelect: s, vehiculos: vehiculos, vehiculosSelected: [], newSocioSelect: null});
            }
        });
    }

    cambiarSocioAsign = (e) => {
        this.setState({
            socioExisteAsign: e.target.value
        });
        this.state.socios.forEach(s => {
            if (s.getKey() === e.target.value) {
                this.setState({socioExisteAsignSelect: s, newSocioSelect: s});
            }
            if (e.target.value === '') {
                this.setState({socioExisteAsignSelect: null, newSocioSelect: null});
            }
        });
    }

    llenarSelect()
    {
        return this.state.socios.map( s =>
                <MenuItem key={s.getCI()} value={s.getKey()}>{s.getShortName()}</MenuItem>
            );
    }

    llenarSelectSocioAsin()
    {
        return this.state.socios.map( s =>
                {
                    if (this.state.socio !== s.getKey())
                        return <MenuItem key={s.getCI()} value={s.getKey()}>{s.getShortName()}</MenuItem>
                    return null;
                }
            );
    }

    onchangevh = (e, v) => {
        this.setState({vehiculosSelected: v, socioExisteAsign: ''});
        if (v.length===0) {
            this.setState({newSocioSelect: null})
        }
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

    handleBind = (e) => {
        this.setState({newSocioSelect: e, socioStepData: e/*, openModal: true*/});
    }

    handleRegistrarCambio = () => {
        this.setState({loading:true});
        let _socioSelect = this.state.socioSelect;
        let _newSocioSelect = this.state.newSocioSelect;
        let _vehiculosSelected = this.state.vehiculosSelected;
        let cambioNombreTransaccion;

        if (!this.state.switchExitSocio) {
            cambioNombreTransaccion = new TransaccionesManage(_socioSelect);
            cambioNombreTransaccion.fechaTransaccion = this.state.fechaTransaccion;
            cambioNombreTransaccion.precioTransaccion = this.state.precio;
            cambioNombreTransaccion.cambioNombre(_newSocioSelect, _vehiculosSelected)
                .then(() => {
                    // console.log(resp);
                    this.notificationDOMRef.current.addNotification({
                        title: "<< TRANSACCIÓN >>",
                        message: "Cambio de nombre realizado correctamente.",
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
                    this.setState({ loading:false, socio: '', socioSelect: null, newSocioSelect: null, vehiculosSelected: [], openModal: false, fechaTransaccion: new Date(), precioTransaccion: 50 });
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
        } else {
            if (ValueUpper(_socioSelect.getCI()) === ValueUpper(_newSocioSelect.ci)) {
                this.notificationDOMRef.current.addNotification({
                    title: "Validación: << Transacción >>",
                    message: "El CI ingresado es el mismo del usuario dueño del los vehículos",
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
            } else {
                cambioNombreTransaccion = new TransaccionesManage(_socioSelect);
                cambioNombreTransaccion.fechaTransaccion = this.state.fechaTransaccion;
                cambioNombreTransaccion.precioTransaccion = this.state.precio;
                cambioNombreTransaccion.cambioNombreNewSocio(_newSocioSelect, _vehiculosSelected)
                    .then(()=>{
                        // console.log(resp);
                        this.notificationDOMRef.current.addNotification({
                            title: "<< TRANSACCIÓN >>",
                            message: "Cambio de nombre realizado correctamente.",
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
                        this.setState({ loading:false, socio: '', socioSelect: null, newSocioSelect: null, vehiculosSelected: [], openModal: false, fechaTransaccion: new Date(), precioTransaccion: 50 });
                    })
                    .catch(e=>{
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
        }

    }

    expandedPanelView(){
        const styles = styleArray;
        return (
            this.state.vehiculosSelected.map( herramienta =>
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
                                <ListItemText primary={herramienta.placa} secondary="Nro Placa" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={herramienta.modelo} secondary="Modelo" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={herramienta.marca} secondary="Marca" />
                            </ListItem>
                            <Divider />
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        );
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    render()
    {
        const styles = styleArray;
        return (
            <div style={styles.root}>
                <Card style={styles.paper}>
                    <CardHeader
                        title="Cambio de nombre"
                        subheader={"Transacciones"}
                    >
                    </CardHeader>
                    <CardContent>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel ref={0} id="inputSocioLabel">
                                Seleccione un socio
                            </InputLabel>
                            <Select
                                labelId="inputSocioLabelSelect"
                                id="inputSocioSelect"
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
                        {(this.state.socio==='') ?
                                <Typography style={styles.colorTextError}>Seleccione un socio</Typography>
                            :
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-vehiculos"
                                    options={this.state.vehiculos}
                                    disableCloseOnSelect
                                    value={this.state.vehiculosSelected} //capturar el valor
                                    onChange={this.onchangevh} //capturar el valor
                                    getOptionLabel={option => option.placa}
                                    renderOption={(option, { selected }) => {
                                        return(
                                            <React.Fragment>
                                                < ThemeProvider theme={themeCheckBox}>
                                                    <Checkbox
                                                        color='primary'
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                {option.placa}
                                                </ThemeProvider>
                                            </React.Fragment>
                                        )
                                    }}
                                    renderInput={params => {
                                        return (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Vehiculos"
                                                placeholder="Seleccione vehiculo(s)"
                                                fullWidth
                                            />
                                        )
                                    }}
                                />
                        }
                        <br/>
                        {(this.state.vehiculosSelected.length === 0) ?
                            <Typography style={styles.colorTextError}>Seleccione por lo menos un vehiculo</Typography>
                            :
                                (
                                <div>
                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    size='medium'
                                                    color='primary'
                                                    checked={this.state.switchExitSocio}
                                                    onChange={ () =>
                                                        this.setState({switchExitSocio : !this.state.switchExitSocio, newSocioSelect: null})
                                                    }
                                                />
                                            }
                                            label="Nuevo socio"
                                        />
                                        <br/>
                                        <br/>
                                    </div>
                                    {
                                        (this.state.switchExitSocio) ?
                                            (
                                                (this.state.socioStepData === null) ?
                                                    (
                                                        <SocioSteper handleBind={this.handleBind} />
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <List>
                                                                <Divider />
                                                                <ListItem>
                                                                    <ListItemText primary={
                                                                        ValueUpper(this.state.newSocioSelect.nombres)
                                                                        + " [ " 
                                                                        + ValueUpper(this.state.newSocioSelect.ci)
                                                                        + " ]"}
                                                                        secondary = "Socio agregado" />
                                                                </ListItem>
                                                                <Divider />
                                                                <br/>
                                                                <Button
                                                                    color="inherit"
                                                                    variant="outlined"
                                                                    onClick = {
                                                                        () => this.setState({
                                                                            socioStepData: null,
                                                                            newSocioSelect: null,
                                                                        })
                                                                    }
                                                                >
                                                                    Cambiar datos
                                                                </Button>
                                                            </List>
                                                        </div>
                                                    )
                                            )
                                            :
                                            (<div>
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel ref={0} id="inputSocioLabelSocioAsign">
                                                        Socio a asignar vehiculo(s)
                                                    </InputLabel>
                                                    <Select
                                                        labelId="inputSocioLabelSelectSocioAsign"
                                                        id="inputSocioSelectSocioAsign"
                                                        value={this.state.socioExisteAsign}
                                                        onChange={this.cambiarSocioAsign}
                                                        variant="outlined"
                                                        labelWidth={250}
                                                    >
                                                        <MenuItem key='null' value=''>
                                                            <em>Seleccione un socio, para asignar los vehículos</em>
                                                        </MenuItem>
                                                        {this.llenarSelectSocioAsin()}
                                                    </Select>
                                                </FormControl>
                                                <br />
                                                <br />
                                            </div>)
                                            // (this.state.newSocioSelect)
                                    }
                                </div>
                                )
                        }

                        {
                            (this.state.newSocioSelect  === null) ?
                                <br/>
                                :
                                <div>
                                    <br/>
                                    <Paper style={styles.paperError}>
                                        <Typography style={styles.colorTextError}>Datos de transacción</Typography>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            < KeyboardDatePicker
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
                                        < InputIcon
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
                                                onClick={ ()=> this.setState({ openModal: true}) }
                                            >
                                                Siguiente
                                            </Button>
                                        </ThemeProvider>
                                    </Paper>
                                    <Dialog fullScreen open={this.state.openModal} /*onClose={this.handleClose}*/ TransitionComponent={this.Transition}>
                                        <AppBar style={styles.appBar}>
                                            <Toolbar>
                                                <IconButton edge="start" color="inherit" onClick={this.handleModelClose} aria-label="close">
                                                    <CloseIcon />
                                                </IconButton>
                                                <Typography variant="h6" style={styles.title}>
                                                    DATOS DEL CAMBIO DE NOMBRE
                                                </Typography>
                                                <Button autoFocus style={styles.butoonSave} onClick={this.handleRegistrarCambio}>
                                                    Guardar
                                                    <Save />
                                                </Button>
                                            </Toolbar>
                                        </AppBar>
                                        {
                                            (!this.state.switchExitSocio) ?
                                            <List>
                                                <ListItem>
                                                    <ListItemText primary={ValueUpper(this.state.socioExisteAsignSelect.getShortName())} secondary="Nombres" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText primary={ValueUpper(this.state.socioExisteAsignSelect.getCI())} secondary="Cedula de identidad" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText primary={ValueUpper(this.state.socioExisteAsignSelect.getCelular())} secondary="Celular" />
                                                </ListItem>
                                                <Divider />
                                            </List>
                                            :
                                            <List>
                                                <ListItem>
                                                    <ListItemText primary={ValueUpper(this.state.newSocioSelect.nombres)} secondary="Nombres" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText primary={ValueUpper(this.state.newSocioSelect.apellidos)} secondary="Apellidos" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText primary={ValueUpper(this.state.newSocioSelect.ci)} secondary="Cedula de identidad" />
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText primary={ValueUpper(this.state.newSocioSelect.celular)} secondary="Celular" />
                                                </ListItem>
                                                <Divider />
                                            </List>
                                        }
                                        { this.expandedPanelView() }
                                    </Dialog>
                                </div>
                        }
                    </CardContent>
                </Card>
                <ReactNotification ref={this.notificationDOMRef} />
                <Backdrop style={styles.loading} open={this.state.loading}>
                    <CircularProgress color="primary" />
                </Backdrop>
            </div>
        );
    }
}

export default CambioNombre;
