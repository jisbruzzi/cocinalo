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

function TextFieldBuscador(props){
    return <TextField
        id="full-width"
        InputLabelProps={{
            shrink: true,
        }}
        value={props.value}
        placeholder="Buscar platos"
        fullWidth
        margin="normal"
        inputRef={props.inputRef}
        onChange={props.onChange}
    />
}

class SimpleAppBar extends Component{
    constructor (props){
        super(props)
        this.state={
            value:""
        }
        this.inputBusqueda=null;
    }

    render(){
        let estiloToolbar={
            display:"flex",
            flexDirection:"row",
    
            justifyContent:"space-between",
            alignItems:"center",
        }
        let grande=this.props.location.pathname.includes("buscador")
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
                        <div className="toolbar vcentered">
                                    
                            <div className={"vcentered logo "+clase}>
                                <img src={logo} height="33" width="140"/>
                            </div>
                            <div className={"vacio "+clase}>
                            </div>
                            <div className={"vcentered utiles "+clase}>
    
                                <div className={"vcentered"}><IconButton 
                                    aria-label="buscar" 
                                    onClick={()=>{
                                        this.props.history.push(this.props.location.pathname+'/buscador')
                                        if(this.inputBusqueda){
                                            this.inputBusqueda.focus()
                                        }
                                        
                                    }}>
                                    <SearchIcon />
                                </IconButton></div>
    
    
                                <div className={"vcentered botones "+clase}>
    
                                    <div className={"vcentered texto-busqueda "+clase}><div>
                                        <TextFieldBuscador 
                                            inputRef={(input)=>{
                                                console.log("ME LLEGA UN NUEVO INPUT!")
                                                this.inputBusqueda=input
                                            }}
                                            value={this.state.value}
                                            onChange={(e)=>this.setState({value:e.target.value})}
                                        />
                                    </div></div>
    
                                    <div className={"cancelar-carrito "+clase}>
                                        <div className={"vcentered carrito "+clase}><IconButton aria-label="carrito" onClick={()=>{this.props.history.push('/carrito')}}>
                                            <ShoppingCartIcon/>
                                        </IconButton></div>
    
                                        <div className={"vcentered cancelar "+clase}><IconButton aria-label="carrito" onClick={()=>{
                                            if(this.inputBusqueda){
                                                this.inputBusqueda.focus()
                                                this.setState({
                                                    value:""
                                                })
                                            }
                                        }}>
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

    
}

export default withRouter(SimpleAppBar);
