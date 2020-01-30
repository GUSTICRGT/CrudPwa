import React, { Component } from "react";
//Material
import { Button } from "@material-ui/core";

const styleArray = {
    spaceBtn: {
        marginTop: '1rem',
    }
};

class ButtonSubmit extends Component
{
    render()
    {
        const styles = styleArray;
        return(
            <Button 
                style={styles.spaceBtn}
                variant={this.props.v} 
                color={this.props.color} 
                className="btnSave"
                type="submit"
            >
                {this.props.text}
            </Button>
        );
    }
}

export default ButtonSubmit;