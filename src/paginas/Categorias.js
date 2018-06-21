import React, { Component } from 'react';
//import './App.css';
import 'typeface-roboto';
import SingleLineGridList from './SingleLineGridList';
import proxy from '../Proxy';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
    function enCarta(titulo,elem){
      return <Card style={{margin:"10px",padding:"0px"}}>
                <CardHeader title={titulo} style={{padding:"8px"}}/>
                <CardContent style={{
                  paddingLeft:0,
                  paddingRight:0,
                  paddingBottom:"16px",
                  paddingTop:"8px",
                }}>
                {elem}
                </CardContent>
              </Card>
  
    }
    let recoms=<SingleLineGridList style={{zIndex:99}} scrollData={this.state.platos.filter(elemento => elemento.categoria == "Recomendados")} />
    let masComps=<SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Los más comprados")} />
    let veggie=<SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Veggie")} />
    let tents=<SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Tentaciones")} />
    return (
        <div>
            {/*
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}}>Recomendados</p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Recomendados")} />
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}} >Los más comprados</p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Los más comprados")} />
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}}>Veggie</p>
            <SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Veggie")} />
            <p style={{marginTop: '1.7em', marginBottom: '1em', fontSize: '20px'}}>Tentaciones</p>
            <SingleLineGridList  scrollData={this.state.platos.filter(elemento => elemento.categoria == "Tentaciones")} />
            */}
            {enCarta("Recomendados para vos",recoms)}
            {enCarta("Los más comprados",masComps)}
            {enCarta("Veggie",veggie)}
            {enCarta("Tentaciones",tents)}
            
        </div>
    );
  }
}

export default Categorias;
