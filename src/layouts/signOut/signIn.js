import React, { Component } from 'react';

//Material UI
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LoginForm from '../../containers/login/loginForm';

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
        marginTop: '5%'
    },
    
};

class SignIn extends Component
{
    render()
    {
        const style = styleArray;
        return (
            <div style={style.root}>
                <Grid container spacing={2} style={style.screen} className="screenResponsive">                      
                    <Grid item style={style.grid}>
                        <LoginForm></LoginForm>
                    </Grid>                      
                </Grid>
            </div>
        );
    }
}

export default SignIn;