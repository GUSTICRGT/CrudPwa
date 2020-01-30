import React, {Component} from 'react';
//firebase
import {fireAuth} from '../config/fire';
// componetes
import SignIn from '../layouts/signOut/signIn';
import Home from '../layouts/singIn/Home';

import Loading from '../assets/img/design/loading.gif';

const styleArray = {
    media: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
    }
};

class RouterMain extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            user: 'loading',
        };
    }

    componentDidMount()
    {
        this.authListener();
    }

    authListener()
    {
        fireAuth.onAuthStateChanged((user) => {
            if (user) 
            {
                this.setState({user});    
                localStorage.setItem('user', user.uid);
            } 
            else 
            {
                this.setState({user:null});
                localStorage.removeItem('user');
            }
        });
    }

    render()
    {
        const styles = styleArray;
        return(
            <div>
                {
                    (this.state.user==='loading') ? 
                        < img
                            style={styles.media}
                            src = {Loading}
                            alt = "loading..." 
                        /> :
                            ( (this.state.user) ? 
                                < Home />  : 
                                < SignIn />
                            )
                }
            </div>
        );
    }
}

export default RouterMain;