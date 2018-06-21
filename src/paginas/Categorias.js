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
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}}>Recomendados</p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Recomendados")} />
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}} >Los más comprados</p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Los más comprados")} />
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}}>Veggie</p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Veggie")} />
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}}>Tentaciones</p>
            <SingleLineGridList  scrollData={this.state.platos.filter(elemento => elemento.categoria == "Tentaciones")} />
        </div>
    );
  }
}

export default Categorias;
