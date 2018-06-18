import React, { Component } from 'react';
//import './App.css';
import 'typeface-roboto';
import SingleLineGridList from './SingleLineGridList';
import proxy from '../Proxy';

class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: []
    }
  }
  componentDidMount() {
      proxy.getPlatos().then((value)=>{this.setState({platos: value})});
  }
  render() {
    return (
        <div>
            <p><b>Recomendados</b></p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Recomendados")} />
            <p><b>Los más comprados</b></p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Los más comprados")} />
            <p><b>Veggie</b></p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Veggie")} />
            <p><b>Tentaciones</b></p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Tentaciones")} />
        </div>
    );
  }
}

export default Categorias;
