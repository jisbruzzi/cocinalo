import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import { BrowserRouter } from 'react-router-dom';
import SimpleBottonNavigation from './SimpleBottonNavigation';
import { NavLink, Switch, Route } from 'react-router-dom';
import * as paginas from "./paginas";



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
                <Route exact path='/' component={paginas.Categorias}></Route>
                <Route exact path='/favoritos' component={paginas.Favoritos}></Route>
                <Route exact path='/packs' component={paginas.Packs}></Route>
                <Route exact path='/comprados' component={paginas.Comprados}></Route>
                <Route exact path='/perfil' component={paginas.Perfil}></Route>
                <Route exact path='/producto/:id' component={paginas.Producto}></Route>
                <Route exact path='/comprar/:id' component={paginas.Comprar}></Route> 
                <Route exact path='/carrito' component={paginas.Carrito}></Route>
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

export default App;
