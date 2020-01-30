import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Tooltip } from '@material-ui/core';



class InputSwitch extends Component
{

    state = {
        gilad: true,
    };

    onFieldChange(event) 
    {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }


    render()
    {
        return(
            <FormControl component="fieldset">
                <FormGroup>
                    <Tooltip title={this.props.txtTooltip}>
                        <FormControlLabel
                            control={
                                <Switch
                                    // checked
                                    id={this.props.idName}
                                    name={this.props.idName}
                                    color={this.props.color}
                                    value={this.props.value}
                                    checked={this.props.value}
                                    onChange={this.onFieldChange.bind(this)}
                                    // value="gilad"
                                />
                            }
                            label={this.props.lblText}
                        />
                    </Tooltip>
                </FormGroup>
            </FormControl>
        );
    }
}

export default InputSwitch;