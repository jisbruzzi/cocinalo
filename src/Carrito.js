import React, { Component } from 'react';
import logo from './logo.svg';
import 'typeface-roboto'
import { Button } from '@material-ui/core';


class Carrito extends Component {
  render() {
    return (
        <div>
            <p> CARRITO </p>

            <Button variant="contained">
            Confirmar compra
            </Button>
        </div>
    );
  }
}

export default Carrito;
