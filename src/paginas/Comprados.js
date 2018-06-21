import React, { Component } from 'react';
import 'typeface-roboto'
import TileBarGridListComprados from './TileBarGridListComprados';
import proxy from '../Proxy';

class Comprados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compras: []
    }
  }
  componentDidMount() {
      proxy.getCompras().then((value)=>{this.setState({compras: value})});
  }
  render() {
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
          <TileBarGridListComprados compras={this.state.compras}/>
        </div>
    )

  }
}

export default Comprados;
