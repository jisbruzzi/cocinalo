import React, { Component } from 'react';
import logo from './logo.svg';
import 'typeface-roboto';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import proxy from './Proxy';


class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: [],
      producto: {}
    }
  }
  componentDidMount() {
      proxy.getPlatos().then((value)=>{this.setState({platos: value}); 
      var producto2 = this.state.platos.find((e)=>{return e.id==this.props.match.params.id});
      this.setState({producto: producto2});
    });
  }

  comprarProducto (idProducto){
        this.props.history.push('/comprar/'+idProducto);
  }
  render() {

    return (
        <div>
            <p> PRODUCTO </p>
            <img src={this.state.producto.img}/>
            <p> Autor: {this.state.producto.author}</p>
            <p> Descripción: {this.state.producto.descripcion}</p>
            <p> Cantidad de estrellas: {this.state.producto.estrellas}</p>

            <Button variant="contained" onClick={()=>{this.comprarProducto(this.state.producto.id)}}>
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
