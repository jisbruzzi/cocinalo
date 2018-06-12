import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import SingleLineGridList from './SingleLineGridList';
import SimpleBottonNavigation from './SimpleBottonNavigation';
import tileData from './tileData.js';

import AppBar from './AppBar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <br/>
        <br/>
        <br/>
        <p>Recomendados</p>
        
        <SingleLineGridList scrollData={tileData} />
        <p>Los más comprados</p>
        <SingleLineGridList scrollData={tileData} />
        <p>Veggie</p>
        <SingleLineGridList scrollData={tileData} />


        <SimpleBottonNavigation />

  
      </div>      
    );
  }
}

/*
<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        */

export default App;
