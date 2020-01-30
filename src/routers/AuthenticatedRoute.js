import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

class AuthenticatedRoute extends Component 
{
  render() 
  {
    
    const {authed, component: Component, ...rest} = this.props;

    if( authed ) 
    {
      return <Route {...rest} render={(props) => <Component {...props }/>}/>
    } 
    else 
    {
      return <Route {...rest} render={(props) => <Redirect to={{pathname: '/session', state: {from: props.location}}} />}/>
    }
  }
}

export default AuthenticatedRoute;