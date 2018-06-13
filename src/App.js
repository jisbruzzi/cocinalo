import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import { BrowserRouter } from 'react-router-dom';
import SimpleBottonNavigation from './SimpleBottonNavigation';
import { NavLink, Switch, Route } from 'react-router-dom';
import Categorias from './Categorias';
import Perfil from './Perfil';
import Favoritos from './Favoritos';
//import tileData from './tileData.js';

import AppBar from './AppBar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <br/>
        <br/>
        <br/>

        <BrowserRouter>
          <div>
         
            <Switch>
              <Route exact path='/' component={Categorias}></Route>
              <Route exact path='/favoritos' component={Favoritos}></Route>
              <Route exact path='/perfil' component={Perfil}></Route>
            </Switch>

            <SimpleBottonNavigation />
          </div>
   
        </BrowserRouter>
        <br/>
        <br/>
        <br/>

  
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
