import {Component} from 'react';

//Material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const StyleArray={
    grid: {
        width: '100%',
        margin: 0,
    },
    paper: {
        padding: '1rem',
        textAlign: 'center',
        color: 'black',
    }
};

class CardFormulario extends Component 
{
    render()
    {
        return(
            <Grid container spacing={24} style={style.grid}>
                <Grid item xs>
                    <Paper style={style.paper} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Ingresar a Vikingos.
                        </Typography>
                    </Paper>
                </Grid>                    
            </Grid>
        );
    }
}

export default CardFormulario;