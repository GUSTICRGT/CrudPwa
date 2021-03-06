import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//import SignIn from './layouts/signOut/signIn';
//import Home from './layouts/singIn/Home';
import RouterMain from './routers/RouterMain';


ReactDOM.render(<RouterMain />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
