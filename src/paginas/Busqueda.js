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
    console.log("#####################")
    console.log(this.props)
  }
  componentDidMount() {
    console.log("-----------------")
    console.log(this.props)
    this.actualizarConsulta()  
  }
  actualizarConsulta(){
    let consulta=this.props.match.params.query
    if(consulta!=this.state.consultada){
      proxy.getPlatosConsulta(consulta).then((value)=>{this.setState({platos: value,consultada:consulta})});
    }
    

  }
  render() {
    console.log("000000000000000000000000000000")
    console.log(this.props)
    this.actualizarConsulta()
    return (
        <div>
          <TileBarGridList 
          data={this.state.platos}
          subheader={<p>Resultado de la búsqueda de <b>{this.props.match.params.query}</b></p>}
          />
        </div>
    );
  }
}

export default Busqueda;

