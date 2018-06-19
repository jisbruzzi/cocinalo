import React, { Component } from 'react';
import 'typeface-roboto'
import { Button } from '@material-ui/core';
import ProductCard from '../ProductCard';
import proxy from '../Proxy';

class Carrito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: [],
    }
  }
  componentDidMount() {
      proxy.getCarrito().then((value)=>{this.setState({platos: value}); 
    });
  }
  render() {
    return (
        <div>
          {this.state.platos.map(item =>
            <div key={item.idPlato}>
               <ProductCard itemCarrito={item}/>
            </div>
          )}
            <Button variant="contained">
            Confirmar compra
            </Button>
        </div>
    );
  }
}

export default Carrito;
