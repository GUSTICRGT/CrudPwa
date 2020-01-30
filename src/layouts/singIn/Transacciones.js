import React, { Component } from 'react';
import {
    Grid,
    Paper,
} from '@material-ui/core';

import TransaccionesDashboard from '../../containers/dashboard/TransaccionesDashboard';
import ListaTransacciones from '../../containers/listas/ListaTransacciones';

const styleArray = {
    root: {
        flexGrow: 1,
    },
    item: {
        padding: '1rem',
    }
};

class Transacciones extends Component 
{
    render()
    {
        const styles = styleArray;
        return (
            <div style={styles.root}>
                <Grid container>
                    <Grid item  md={6} sm={12} xs={12} style={styles.item}>
                        <Paper>
                            <ListaTransacciones/>
                        </Paper>
                    </Grid>
                    <Grid item  md={6} sm={12} xs={12} style={styles.item}>
                        <Paper>
                            <TransaccionesDashboard />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Transacciones;