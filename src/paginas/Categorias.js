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
      platos: [],
	    vegetariano: false,
	    celiaco: false,
    }
  }

  componentWillMount() {
      proxy.getSwitchVegetariano().then((valor)=>{
        this.setState({vegetariano: valor});
    });
      proxy.getSwitchCeliaco().then((valor)=>{
        this.setState({celiaco: valor});
    });
  }

  componentDidMount() {
      proxy.getPlatos().then((value)=>{this.setState({platos: value})});
  }

  
  render() {
    function enCarta(titulo,elem){
      return <Card style={{margin:"10px",padding:"0px"}}>
                <CardHeader title={<p style={{fontFamily: 'Patua One', fontSize: '20px'}}>{titulo}</p>} style={{padding:"8px"}}/>
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
    let recoms=<SingleLineGridList style={{zIndex:99}} scrollData={this.state.platos.filter(elemento => elemento.categoria == "Recomendados").filter(elemento=> (!this.state.vegetariano ||  elemento.restricciones.includes('vegetariano'))).filter(elemento=> (!this.state.celiaco ||  elemento.restricciones.includes('celiaco')))} />
    let masComps=<SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Los más comprados").filter(elemento=> (!this.state.vegetariano ||  elemento.restricciones.includes('vegetariano'))).filter(elemento=> (!this.state.celiaco ||  elemento.restricciones.includes('celiaco')))} />
    let veggie=<SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Veggie").filter(elemento=> (!this.state.vegetariano ||  elemento.restricciones.includes('vegetariano'))).filter(elemento=> (!this.state.celiaco ||  elemento.restricciones.includes('celiaco')))} />
    let tents=<SingleLineGridList scrollData={this.state.platos.filter(elemento => elemento.categoria == "Tentaciones").filter(elemento=> (!this.state.vegetariano ||  elemento.restricciones.includes('vegetariano'))).filter(elemento=> (!this.state.celiaco ||  elemento.restricciones.includes('celiaco')))} />
    return (
        <div>

            {enCarta("Recomendados para vos",recoms)}
            {enCarta("Los más comprados",masComps)}
            {enCarta("Veggie",veggie)}
            {enCarta("Tentaciones",tents)}
            
        </div>
    );
  }
}

export default Categorias;
