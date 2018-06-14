import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


function SimpleAppBar(props) {
  let estiloToolbar={
      display:"flex",
      justifyContent:"space-between"
  }
  return (
        <AppBar position="fixed" color="default">
            <Toolbar style={estiloToolbar}>
                <Typography variant="title" color="inherit">
                    Cocinalo!
                </Typography>
                <div>
                    <IconButton aria-label="carrito" onClick={()=>{props.history.push('/carrito')}}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton aria-label="buscar">
                        <SearchIcon />
                    </IconButton>

                </div>
          
          
            </Toolbar>
        </AppBar>
  );
}
//<Button color="inherit"><Icon><></Button>

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(SimpleAppBar);//withStyles(styles)(SimpleAppBar);