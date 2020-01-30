import React, {Component} from 'react';
import IndexDashboard from '../../containers/dashboard/IndexDashboard';
import { Grid } from '@material-ui/core';

//notificcacion
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const styleArray = {
    root: {
        flexGrow: 1,
    },
    grid: {
        margin: '0 auto',
        maxWidth: '800px',
        //height: '100px',
    },
    paper: {
        padding: '1rem',
        textAlign: 'center',
        //color: 'black',
    },
    screen:{
        width: '100%',
        marginTop: '1%'
    },
    
};


class  Index extends Component 
{

    constructor(props) {
        super(props);
        this.addNotification = this.iniciando.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() 
    {
        // this.iniciando();
    }

    iniciando()
    {
        this.notificationDOMRef.current.addNotification({
            title: "Autentificación",
            message: "Bien hecho. Sesión iniciada.",
            type: "success",
            insert: "bottom",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 5000 },
            dismissable: { click: false }
        });
    }

    render()
    {
        const style = styleArray;
        return(            
            <div style={style.root}>
                <ReactNotification ref={this.notificationDOMRef} />
                <Grid container spacing={2} style={style.screen} className="screenResponsive">                      
                    <Grid item style={style.grid}>
                        <IndexDashboard />
                    </Grid>                      
                </Grid>
            </div>
        );
    }
}

export default Index;