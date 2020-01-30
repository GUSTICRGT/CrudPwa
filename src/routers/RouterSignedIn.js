import React, {Component} from "react";
import Index from "../layouts/singIn/Index";
import Socios from "../layouts/singIn/Socios";
import Transacciones from "../layouts/singIn/Transacciones";
import { Switch, Route } from "react-router-dom";


const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <Index/>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/socios",
    exact: false,
    sidebar: () => <Socios/>,
    main: () => <h2>Socios</h2>
  },
  {
    path: "/transacciones",
    exact: false,
    sidebar: () => <Transacciones/>,
    main: () => <h2>transacciones</h2>
  }
];

class RouterSignedIn extends Component
{
    render()
    {
        return(
            <Switch>
                {routes.map((route, index) => 
                    
                    <Route
                        key={index} 
                        path={route.path} 
                        exact={route.exact}
                        component={route.sidebar}
                    />
                )}
                    
            </Switch>
        );
    }
}

export default RouterSignedIn;