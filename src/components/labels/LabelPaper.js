import React, { Component } from 'react';
//Material
import Paper from '@material-ui/core/Paper';
//Components
import LabelTitle from './LabelTitle';

const styleArray = {
    paper: {
        padding: '1rem',
        textAlign: 'center',
        //color: 'black',
    }
};

class LabelPaper extends Component
{
    render()
    {
        const style = styleArray;
        return(
            <Paper style={style.paper} elevation={1}>
                <LabelTitle v={this.props.v} c={this.props.c} text={this.props.text}/>
            </Paper>
        );
    }
}

export default LabelPaper;