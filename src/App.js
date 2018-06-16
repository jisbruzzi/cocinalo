import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import { BrowserRouter } from 'react-router-dom';
import SimpleBottonNavigation from './SimpleBottonNavigation';
import { NavLink, Switch, Route } from 'react-router-dom';
import Categorias from './paginas/Categorias';
import Perfil from './paginas/Perfil';
import Favoritos from './paginas/Favoritos';
import Comprados from './paginas/Comprados';
import Packs from './paginas/Packs';
import Producto from './paginas/Producto';
import Comprar from './paginas/Comprar';
import Carrito from './paginas/Carrito';



//import tileData from './tileData.js';

import AppBar from './AppBar.js'

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <br/>
        <br/>
        <br/>
        <BrowserRouter>
            <div>
              <AppBar />

              <Switch>
                <Route exact path='/' component={Categorias}></Route>
                <Route exact path='/favoritos' component={Favoritos}></Route>
                <Route exact path='/packs' component={Packs}></Route>
                <Route exact path='/comprados' component={Comprados}></Route>
                <Route exact path='/perfil' component={Perfil}></Route>
                <Route exact path='/producto/:id' component={Producto}></Route>
                <Route exact path='/comprar/:id' component={Comprar}></Route> 
                <Route exact path='/carrito' component={Carrito}></Route>
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
