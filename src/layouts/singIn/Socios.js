import React, {Component} from 'react';
import { Grid, Paper } from '@material-ui/core';
import StepSocios from '../../containers/steppers/stepSocios';
import ListaSocios from '../../containers/listas/ListaSocios';

const styleArray = {
    root: {
        flexGrow: 1,
    },
    item:{
        padding: '1rem',
    }
};

class  Socios extends Component 
{
    render()
    {
        const styles = styleArray;
        return(
            <div style={styles.root}>
                <Grid container>
                    <Grid item  md={6} sm={12} xs={12} style={styles.item}>
                        <Paper>
                            <StepSocios />
                        </Paper>
                    </Grid>
                    <Grid item  md={6} sm={12} xs={12} style={styles.item}>
                        <Paper> 
                            <ListaSocios/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Socios;