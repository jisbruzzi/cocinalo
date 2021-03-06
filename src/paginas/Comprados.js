import React, { Component } from 'react';
import 'typeface-roboto'
import TileBarGridList from './TileBarGridList';
import proxy from '../Proxy';

class Comprados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compras: []
    }
  }
  componentDidMount(){
    this.actualizarConsulta()
  }
  actualizarConsulta() {
      proxy.getCompras().then((value)=>{this.setState({compras: value})});
  }
  mostrarProducto(platoListo){
    this.props.history.push({
      pathname:"/productocomprado",
      state:{compra:platoListo.compra}
    })
  }
  render() {
    let platosListos=this.state.compras.map((compra)=>{
      return {
        compra:compra,
        key: compra.idCompra+"-"+compra.plato.img,
        img:compra.plato.img,
        title:"("+compra.cantidad+") "+compra.plato.title,
        author:compra.plato.author
      }
    })
    if (this.state.compras.length == 0) {
      return (
        <div>
          <br />
          <h3> NO HAY COMPRAS </h3>
        </div>
      )}
      else
    return (
        <div>
          <TileBarGridList
            data={platosListos}
            onClickData={(p)=>this.mostrarProducto(p)}
          />
        </div>
    )

  }
}

export default Comprados;
