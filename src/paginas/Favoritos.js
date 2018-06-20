import React, { Component } from 'react';
import 'typeface-roboto'
import TileBarGridList from './TileBarGridList';
import proxy from '../Proxy';

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: []
    }
  }
  componentDidMount() {
      proxy.getPlatosFavoritos().then((value)=>{this.setState({platos: value})});
  }
  mostrarProducto(platoListo){
    this.props.history.push("/producto/"+platoListo.id)
  }
  render() {
    let platosListos=this.state.platos.map((plato)=>{
      return {
        id:plato.id,
        key:plato.img,
        img:plato.img,
        title:plato.title,
        author:plato.author
      }
    })
    return (
        <div>
          <TileBarGridList 
          data={platosListos}
          onClick={(p)=>this.mostrarProducto(p)}
          />
        </div>
    );
  }
}

export default Favoritos;

