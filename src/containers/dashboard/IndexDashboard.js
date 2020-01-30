import React, { Component } from 'react'
import Logo  from '../../assets/img/design/logOf.png';
import { Grid, Paper, CardMedia } from '@material-ui/core';

const styleArray = {
    paper: {
        padding: '0rem',
        textAlign: 'center',
        border: '4px solid rgb(32, 123, 214)',
    },
    media: {
        paddingTop: '85%', // 16:9
        margin: 'auto',
        width: '80%',
    },
    dashboard: {
        padding: "1rem",
    }
};

class IndexDashboard extends Component
{
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

                    <div style={styles.dashboard}>
                        <p>
                            Bienvenido(a) al sistema de control de transacciones internas del grupo Vikingos del S.M.S.U.
                        </p>
                    </div>                    

                </Paper>     
            </Grid>
        );
    }
}

export default IndexDashboard;