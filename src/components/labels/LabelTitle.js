import React, {Component} from 'react';
//Material
import Typography from '@material-ui/core/Typography';

class LabelTitle extends Component
{
    render()
    {
        return(
            <Typography variant={this.props.v} component={this.props.c}>
                {this.props.text}
            </Typography>
        );
    }
}

export default LabelTitle;