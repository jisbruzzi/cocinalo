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
    this.delete=this.delete.bind(this);
  }
  componentDidMount() {
      proxy.getCarrito().then((value)=>{this.setState({platos: value}); 
    });
  }

  delete(id){
    this.setState(function(state) {
      var nuevaLista = state.platos.slice();

      let resultado = nuevaLista.find(e => e.idPlato == id);
      var index = nuevaLista.indexOf(resultado);
      nuevaLista.splice(index,1);
      return {platos: nuevaLista};
    });
  }

  render() {
    return (
        <div>
          {this.state.platos.map(item =>
            <div key={item.idPlato}>
               <ProductCard itemCarrito={item} delete={this.delete}/>
            </div>
          )}
            <br />
            <Button variant="contained">
            Confirmar compra
            </Button>
        </div>
    );
  }
}

export default Carrito;
