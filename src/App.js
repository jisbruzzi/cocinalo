import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto'
import { BrowserRouter } from 'react-router-dom';
import SimpleBottonNavigation from './SimpleBottonNavigation';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import * as paginas from "./paginas";
import ProductoComprado from "./paginas/ProductoComprado";


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
                <Route path={`(.*)/buscador`} component={paginas.Buscador}/>
                <Route path='/favoritos' component={paginas.Favoritos}></Route>
                <Route path='/busqueda/:query' component={paginas.Busqueda}></Route>
                <Route path='/packs' component={paginas.Packs}></Route>
                <Route path='/comprados' component={paginas.Comprados}></Route>
                <Route path='/perfil' component={paginas.Perfil}></Route>
                <Route path='/producto/:id' component={paginas.Producto}></Route>

                {/* VER CUALES SIRVEN */}
                <Route path='/comprar' component={paginas.Comprar}></Route> 
                <Route path='/productoComprado/:id' component={paginas.ProductoComprado}></Route>
                <Route path='/comprar/:id' component={paginas.Comprar}></Route> 
                {/* FIN VER CUALES SIRVEN */}

                <Route path='/carrito' component={paginas.Carrito}></Route>
                <Route path='/productocomprado' component={ProductoComprado}></Route>
                <Route path='/home' component={paginas.Categorias}></Route>
                <Route exact path='/' render={
                  ()=><Redirect to={"/home"}/>
                }></Route>
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
