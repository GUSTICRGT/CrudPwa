import React, { Component } from 'react';
//Material
import TextField from '@material-ui/core/TextField';

class InputOutline extends Component
{
    render()
    {
        return(
            <TextField
                id={this.props.id}
                label={this.props.label}
                helperText={this.props.helper}
                margin={this.props.margin}
                variant="outlined"
                autoComplete="off"
            />
        );
    }
}

export default InputOutline;