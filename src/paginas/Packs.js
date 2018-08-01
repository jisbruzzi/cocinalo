import React, { Component } from 'react';
import 'typeface-roboto'
import 'typeface-roboto';
import SingleLineGridList from './SingleLineGridList';
import proxy from '../Proxy';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

class Packs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: [],
      packs: [],
      packsComprados: [],
    };
  }
  componentWillMount() {
      proxy.getPlatos().then((platosObtenidos)=>{this.setState({platos: platosObtenidos})});
      proxy.getPacks().then((packsObtenidos)=>{this.setState({packs: packsObtenidos})});
      proxy.getPacksComprados().then((packsCompradosObtenidos)=>{this.setState({packsComprados: packsCompradosObtenidos})});
  }

  handleSubmit(id) {
          this.props.history.push({
          pathname: '/comprarPack',
          state: { 
            itemsCarrito: [{idPack: id, cantidad: 1, datosPack: this.state.packs.find(e => e.id == id) }]
	               }
          });
  }

  enCarta(id) {
      let pack = this.state.packs.find(e => e.id == id);
      let packComprado = this.state.packsComprados.find(e => e.id == id);

	if (pack) {
		console.log("Este es el pack: "+ pack.id)
	}

	if (packComprado) {
		console.log("Este es el pack comprado: "+packComprado.id)
	}

      if (pack) {

        return <Card style={{margin:"10px",padding:"0px"}}>
                <CardHeader title={<p style={{fontFamily: 'Patua One', fontSize: '20px'}}>{pack.nombre}</p>} style={{padding:"8px"}}/>
                
                { (packComprado) && <Typography gutterBottom style={{fontFamily: 'Patua One', fontSize: '20px'}} variant="headline" component="h2" align="left">
                  {"Cantidad restante: " + ((!packComprado)? 30: packComprado.cantidad) }
                </Typography> }

                { (packComprado) && <Typography gutterBottom style={{fontFamily: 'Patua One', fontSize: '20px'}} variant="headline" component="h2" align="left">
                  {"Dias restantes: 30"}
                </Typography> }

                <CardContent style={{
                  paddingLeft:0,
                  paddingRight:0,
                  paddingBottom:"16px",
                  paddingTop:"8px",
                }}>
                <SingleLineGridList style={{zIndex:99}} scrollData={this.state.platos.filter(elemento => elemento.pack === pack.nombre)} />
                </CardContent>
                { (!packComprado) && <Button style={{'margin': '5px 0px'}} fullWidth variant="contained" color="primary"                    
                    onClick={()=>{this.handleSubmit(0)}}>
                    {"Comprar - $" + pack.precio}
                </Button> }

            </Card>
      }
    }

  render() {
       
    return (

        <div>
            {this.enCarta(0)}
            {this.enCarta(1)}
            {this.enCarta(2)}
            {this.enCarta(3)}
        </div>
    );
  }
}

export default Packs;
