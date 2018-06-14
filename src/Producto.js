import React, { Component } from 'react';
import logo from './logo.svg';
import 'typeface-roboto';
import tileData from './tileData.js';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


class Producto extends Component {
  comprarProducto (idProducto){
        this.props.history.push('/comprar/'+idProducto);
        console.log(idProducto);
  }
  render() {
    var producto = tileData.find((e)=>{return e.id==this.props.match.params.id});


    return (
        <div>
            <p> PRODUCTO </p>
            <img src={producto.img}/>
            <p> Autor: {producto.author}</p>
            <p> Descripción: {producto.descripcion}</p>
            <p> Cantidad de estrellas: {producto.estrellas}</p>

            <Button variant="contained" onClick={()=>{this.comprarProducto(producto.id)}}>
            Comprar
            </Button>

            <Button variant="contained">
            Añadir al carrito
            </Button>
        </div>


    );
  }
}

export default withRouter(Producto);
