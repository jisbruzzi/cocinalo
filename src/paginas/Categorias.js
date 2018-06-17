import React, { Component } from 'react';
//import './App.css';
import 'typeface-roboto'
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
            <p>Recomendados</p>
            <SingleLineGridList scrollData={this.state.platos} />
            <p>Los más comprados</p>
            <SingleLineGridList scrollData={this.state.platos} />
            <p>Veggie</p>
            <SingleLineGridList scrollData={this.state.platos} />
        </div>
    );
  }
}

export default Categorias;
