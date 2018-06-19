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
      plato: {}
    }
  }
  componentDidMount() {
    console.log("xxx:" + this.props.match.params.id);
    proxy.getPlatoById(this.props.match.params.id).then((p)=>{this.setState({plato: p}); 
    //var producto2 = this.state.platos.find((e)=>{return e.id==this.props.match.params.id});
    //this.setState({producto: producto2});
    });
  }

username: 'Pepenacho',
nombre: 'José',
apellido: 'Sbruzzi',
direccion: 'Paseo Colón 850',
tarjetaNumero: '1249-9203-3021-8745',
  render() {
    return (
        <div>
            <br/>
            <br/>
            <p> Datos del usuario </p>
            <p> Nombre: </p>
            <p> Apelido: </p>
            <p> Direccion: </p>
            <p> Numero de tarjeta: </p>
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
