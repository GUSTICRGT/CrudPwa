import React, { Component } from 'react';
//Material
import { Grid, TextField, Tooltip, InputAdornment } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const styleArray = {
    icon: {
        padding: '1rem 0rem 1rem 1rem',
        textAlign: 'center'
    },
    input: {
        width: '100%',
    },
    spaceInput: {
        padding: '2rem 3rem 1rem 1rem',
    },
    spaceIcon: {
        paddingRight: "0.5rem",
    }
};

class InputIcon extends Component
{

    onFieldChange(event) 
    {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    render()
    {
        const styles = styleArray;
        return(
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item style={styles.spaceIcon}>
                    <Icon style={styles.icon}>{this.props.nameIcon}</Icon>                    
                </Grid>
                <Grid item xs style={styles.spaceInput}>
                    <TextField          
                        style={styles.input}              
                        id={this.props.idName}
                        name={this.props.idName}
                        value={this.props.value}

                        disabled={this.props.estado}
                        required={this.props.requerido}
                        error={this.props.error}

                        label={this.props.labelText}
                        helperText={this.props.helperText}
                        margin={this.props.margin}  
                        
                        autoComplete="off"
                        
                        variant="outlined"

                        onChange={this.onFieldChange.bind(this)}

                        InputProps={{
                            [this.props.adornPositionVar]: (this.props.adorn) ?(<Tooltip title={this.props.adornTooltip}><InputAdornment position={this.props.adornPosition}><Icon>{this.props.adornIco}</Icon></InputAdornment></Tooltip>):null,
                        }}
                    />
                </Grid>
            </Grid>
        );
    }
}

InputIcon.defaultProps = {
    adorn: false
};

export default InputIcon;