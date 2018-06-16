import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import logo from './img/logo.png';

function SimpleAppBar(props) {
  let estiloToolbar={
      display:"flex",
      justifyContent:"space-between"
  }
  return (
        <AppBar position="fixed" color="default">
            <Toolbar style={estiloToolbar}>
                <img src={logo} height="33" width="140"/>
                <div>
                    <IconButton aria-label="buscar">
                        <SearchIcon />
                    </IconButton>
                    <IconButton aria-label="carrito" onClick={()=>{props.history.push('/carrito')}}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton aria-label="mas">
                        <MoreVertIcon />
                    </IconButton>

                </div>
          
          
            </Toolbar>
        </AppBar>
  );
}

export default withRouter(SimpleAppBar);
