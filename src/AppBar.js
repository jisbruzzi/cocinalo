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

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


//LO QUE TENGO QUE HACER ES PONER UN ROUTER ADENTRO DE UN ROUTER COMO EN https://reacttraining.com/react-router/web/example/basic

function SimpleAppBar(props) {
  let estiloToolbar={
      display:"flex",
      justifyContent:"space-between"
  }
  return (
      <div>
        <AppBar position="fixed" color="default">
            <Toolbar style={estiloToolbar}>
                <img src={logo} height="33" width="140"/>
                <div>
                    <IconButton 
                        aria-label="buscar" 
                        onClick={()=>{props.history.push(props.location.pathname+'/buscador')}}>

                            <SearchIcon />
                        
                    </IconButton>
                    <IconButton aria-label="carrito" onClick={()=>{props.history.push('/carrito')}}>
                        <ShoppingCartIcon />
                    </IconButton>

                </div>
          
          
            </Toolbar>
        </AppBar>
    </div>
  );
}

export default withRouter(SimpleAppBar);
