import React, { Component } from "react";
import { Grid, Icon, TextField, InputAdornment, IconButton } from "@material-ui/core";
import '../../assets/css/inputResponsiveStyle.css';

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

class InputPassword extends Component
{

    state = {
        showPassword: false
    };

    onFieldChange(event) 
    {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    handleClickShowPassword = () => 
    {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render()
    {
        const styles = styleArray;
        return(
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item style={styles.spaceIcon}>
                    <Icon style={styles.icon}>{this.props.nameIcon}</Icon>
                </Grid>
                <Grid item style={styles.spaceInput} className='inputPasswordResponsive'>
                    <TextField 
                        style={styles.input}
                        className="txtPassword"
                        id={this.props.idName}
                        name={this.props.idName}
                        value={this.state.password}

                        disabled={this.props.estado}
                        required={this.props.requerido}
                        error={this.props.error}

                        label={this.props.labelText}
                        helperText={this.props.helperText}
                        margin={this.props.margin}  
                        
                        variant="outlined"
                        autoComplete="off"

                        type={this.state.showPassword ? "text" : "password"}

                        onChange={this.onFieldChange.bind(this)}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default InputPassword;