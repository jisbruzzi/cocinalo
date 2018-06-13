import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
//import { BrowserRouter } from 'react-router-dom';
import SingleLineGridList from './SingleLineGridList';
import tileData from './tileData.js';


class Categorias extends Component {
  render() {
    return (
        <div>
            <p>Recomendados</p>
        
            <SingleLineGridList scrollData={tileData} />
            <p>Los más comprados</p>
            <SingleLineGridList scrollData={tileData} />
            <p>Veggie</p>
            <SingleLineGridList scrollData={tileData} />
        </div>
    );
  }
}

export default Categorias;
