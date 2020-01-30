import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {PermIdentity, /*DirectionsCar,*/ Commute, AccountBox, ExitToApp, Home as House} from '@material-ui/icons/';
import {fireAuth} from '../../config/fire';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RouterSignedIn from '../../routers/RouterSignedIn';
import { BrowserRouter ,Link } from 'react-router-dom';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
    marginTop: 70,
  },
  grow: {
    flexGrow: 1,
  },
  typographyLink: {
    textDecoration: 'none',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Home extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

    toggleDrawer = (side, open) => (e) => {
      // console.log(e);
      this.setState({
        [side]: open,
      });
    };

  clickSalir(e)
  {
    fireAuth.signOut();
  }  

  render() 
  {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
            <ListItem button key={"Home"} component={Link} to="/">              
              <ListItemIcon><House /></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button key={"Socios"} component={Link} to="/socios">              
              <ListItemIcon><PermIdentity /></ListItemIcon>
              <ListItemText primary={"Socios"} />
            </ListItem>
            {/* <ListItem button key={"Vehículos"}>
              <ListItemIcon><DirectionsCar /></ListItemIcon>
              <ListItemText primary={"Vehículos"} />
            </ListItem> */}
            <ListItem button key={"Transacciones"} component={Link} to="/transacciones">
              <ListItemIcon><Commute /></ListItemIcon>
              <ListItemText primary={"Transacciones"} />
            </ListItem>
            <Divider/>
            <ListItem button key={"Perfil"}>
              <ListItemIcon><AccountBox /></ListItemIcon>
              <ListItemText primary={"Perfil"} />
            </ListItem>
        </List>
      </div>
    );

    return (
      <BrowserRouter>
        <div>
          <div style={styles.root}>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton onClick={this.toggleDrawer('bottom', true)} style={styles.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography style={styles.grow}>
                  <Typography variant="h6" color="inherit" style={styles.typographyLink} component={Link} to="/">
                    Vikingos
                  </Typography>
                </Typography>
                <Button color="inherit" onClick={this.clickSalir}><ExitToApp/>Cerrar sesión</Button>
              </Toolbar>
            </AppBar>
          </div>
          <Drawer
            anchor="bottom"
            open={this.state.bottom}
            onClose={this.toggleDrawer('bottom', false)}
          >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >
            {fullList}
          </div>
          </Drawer>
          <RouterSignedIn/>  
        </div>
      </BrowserRouter>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);