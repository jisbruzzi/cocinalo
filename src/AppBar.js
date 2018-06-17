import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { withRouter, Switch } from 'react-router-dom';
import logo from './img/logo.png';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CSSTransitionGroup} from "react-transition-group";
import "./AppBar.css"
import TextField from '@material-ui/core/TextField';

//LO QUE TENGO QUE HACER ES PONER UN ROUTER ADENTRO DE UN ROUTER COMO EN https://reacttraining.com/react-router/web/example/basic

function SimpleAppBar(props) {
  let estiloToolbar={
      display:"flex",
      flexDirection:"row",

      justifyContent:"space-between",
      alignItems:"center",
  }
  console.log(props.location)
  let grande=props.location.pathname.includes("buscador")
  let clase=""
  if(grande){
      clase="grande"
  }else{
      clase="normal"
  }
  return (
      <div>
        <AppBar position="fixed" color="default">
            <Toolbar>
                <div class="toolbar vcentered">
                            
                    <div class={"vcentered logo "+clase}>
                        <img src={logo} height="33" width="140"/>
                    </div>
                    <div class={"vacio "+clase}>
                    </div>
                    <div class={"vcentered utiles "+clase}>

                        <div class={"vcentered"}><IconButton 
                            aria-label="buscar" 
                            onClick={()=>{props.history.push(props.location.pathname+'/buscador')}}>
                            <SearchIcon />
                        </IconButton></div>


                        <div class={"vcentered botones "+clase}>

                            <div class={"vcentered texto-busqueda "+clase}><div><TextField
                                id="full-width"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="Buscar platos"
                                fullWidth
                                margin="normal"
                            /></div></div>

                            <div class={"cancelar-carrito "+clase}>
                                <div class={"vcentered carrito "+clase}><IconButton aria-label="carrito" onClick={()=>{props.history.push('/carrito')}}>
                                    <ShoppingCartIcon/>
                                </IconButton></div>

                                <div class={"vcentered cancelar "+clase}><IconButton aria-label="carrito" onClick={()=>{props.history.push('/cancelado')}}>
                                    <CancelIcon/>
                                </IconButton></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    </div>
  );
}

export default withRouter(SimpleAppBar);
