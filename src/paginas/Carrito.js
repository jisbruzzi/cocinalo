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
    this.eliminarProducto=this.eliminarProducto.bind(this);
  }
  componentDidMount() {
      proxy.getCarrito().then((value)=>{this.setState({platos: value}); 
    });
  }
  
  eliminarProducto(id){
    console.log("Contenido platos antes de borrar:");
    console.log(this.state.platos);
    let platosActualizados = proxy.quitarPlatoDeCarrito(id);
    console.log("Platos actualizados");
    console.log(platosActualizados);
    this.setState({platos: platosActualizados});
    console.log("Contenido state luego de borrar:");
    console.log(this.state.platos);
  }

  render() {
    return (
        <div>
          {this.state.platos.map(item =>
            <div key={item.idPlato}>
               <ProductCard itemCarrito={item} onDelete={(id)=>{this.eliminarProducto(id)}}/>
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
