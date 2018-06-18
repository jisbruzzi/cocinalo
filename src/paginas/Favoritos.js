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
  render() {
    return (
        <div>
          <TileBarGridList data={this.state.platos}/>
        </div>
    );
  }
}

export default Favoritos;

