import React, { Component } from 'react';
import 'typeface-roboto'
import { Button } from '@material-ui/core';
import proxy from '../Proxy';

class Comprar extends Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      plato: {},
      user: {}
    }
  }

  componentDidMount() {
    proxy.getUsuario().then(u => {this.setState({user: u})});
    proxy.getPlatoById(this.props.match.params.id).then((p)=>{this.setState({plato: p}); 
    //var producto2 = this.state.platos.find((e)=>{return e.id==this.props.match.params.id});
    //this.setState({producto: producto2});
    });
  }

  render() {
    return (
        <div>
            <br/>
            <br/>
            <h2> Datos del usuario</h2>
            <p> Nombre: { this.state.user.nombre } </p>
            <p> Apelido: { this.state.user.apellido } </p>
            <p> Direccion: { this.state.user.direccion } </p>
            <p> Numero de tarjeta: { this.state.user.tarjetaNumero } </p>
            <h2> Datos del producto </h2>
            <p> Nombre: {this.state.plato.title} </p>
            <p> Cantidad: {this.props.location.state.cantidadPedida}</p>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button variant="contained">
            Confirmar compra
            </Button>
        </div>
    );
  }
}

export default Comprar;
