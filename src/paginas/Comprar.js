import React, { Component } from 'react';
import 'typeface-roboto'
import { Button } from '@material-ui/core';


class Comprar extends Component {
  render() {
    return (
        <div>
            <br/>
            <br/>
            <p> Ingrese sus datos </p>
            <p> Nombre: </p>
            <p> Apellido: </p>
            <p> Direccion: </p>
            <p> Tarjeta número: </p>
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
