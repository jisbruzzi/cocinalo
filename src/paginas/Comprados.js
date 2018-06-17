import React, { Component } from 'react';
import 'typeface-roboto'
import TileBarGridList from '../TileBarGridList';
import proxy from '../Proxy';

class Comprados extends Component {
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
          <TileBarGridList data={this.state.platos}/>
        </div>
    );
  }
}

export default Comprados;
