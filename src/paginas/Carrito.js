import React, { Component } from 'react';
import 'typeface-roboto'
import { Button } from '@material-ui/core';
import ProductCard from '../ProductCard';
import proxy from '../Proxy';

class Carrito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCarrito: [],
    }
    this.delete=this.delete.bind(this);
  }
  componentDidMount() {
      proxy.getCarrito().then((value)=>{this.setState({itemsCarrito: value}); 
    });
  }

  delete(id){
    //Borro elemento en el modelo
    proxy.quitarPlatoDeCarrito(id);

    //Borro elemento en la vista
    this.setState(function(state) {
      var nuevaLista = state.itemsCarrito.slice();

      let resultado = nuevaLista.find(e => e.idPlato == id);
      var index = nuevaLista.indexOf(resultado);
      nuevaLista.splice(index,1);
      return {itemsCarrito: nuevaLista};
    });
  }

  comprarProductos(itemsCarrito){
    this.props.history.push({
      pathname: '/comprar',
      state: { itemsCarrito: itemsCarrito }
    });
  }

  render() {
    if (this.state.itemsCarrito.length == 0)
    return (
      <div>
        <br />
        <h3> CARRITO VACIO </h3>
      </div>
    )
  else
    return (
        <div>
          {this.state.itemsCarrito.map(item =>
            <div key={item.idPlato}>
               <ProductCard itemCarrito={item} delete={this.delete}/>
            </div>
          )}
            <br />
            <Button variant="contained" onClick={()=>{this.comprarProductos(this.state.itemsCarrito)}}>
            Comprar
            </Button>
        </div>
    );
  }
}

export default Carrito;
