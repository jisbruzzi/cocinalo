import React, { Component } from 'react';
import 'typeface-roboto'
import TileBarGridList from './TileBarGridList';
import proxy from '../Proxy';
import queryString from "query-string"

class Busqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: [],
      consultada:""
    }
  }
  componentDidMount() {
    this.actualizarConsulta()  
  }
  actualizarConsulta(){
    let consulta=this.props.match.params.query
    if(consulta!=this.state.consultada){
      proxy.getPlatosConsulta(consulta).then((value)=>{this.setState({platos: value,consultada:consulta})});
    }
  }
  mostrarProducto(platoListo){
    console.log("VOY A MOSTRAR UN PRODUCTO")
    console.log(platoListo)
    if(platoListo.id==undefined){
      throw new DOMException("PELOTUDO")
    }
    this.props.history.push("/producto/"+platoListo.id)

  }
  render() {
    this.actualizarConsulta()
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
          subheader={<p>Resultado de la búsqueda de <b>{this.props.match.params.query}</b></p>}
          onClickData={(p)=>this.mostrarProducto(p)}
          />
        </div>
    );
  }
}

export default Busqueda;

