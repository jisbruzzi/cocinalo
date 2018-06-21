import React, { Component } from 'react';
import 'typeface-roboto';
import { withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Divider from '@material-ui/core/Divider';
import HorizontalNonLinearAlternativeLabelStepper from './HorizontalNonLinearAlternativeLabelStepper'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%',
  },
  menu: {
    width: '95%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  card: {
    marginLeft: '10px',
    marginRight: '10px'
  },
});

const cantidades = [
  {
    value: 1,
    label: '1 UNIDAD',
  },
  {
    value: 2,
    label: '2 UNIDADES',
  },
  {
    value: 3,
    label: '3 UNIDADES',
  },
  {
    value: 4,
    label: '4 UNIDADES',
  },
  {
    value: 5,
    label: '5 UNIDADES',
  }
];

class ProductoComprado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compra: this.props.location.state.compra,
      ingredientes: []
    }
  }
 
  componentDidMount() {
    this.setState({ingredientes: this.state.compra.plato.ingredientes.split(".")});
  }

  formatearFecha(timestamp) {
    return timestamp.getDate() + '/' + timestamp.getMonth() + '/' + timestamp.getFullYear();
  }

  segundosParaEntrega(timestamp) {
    const DEMORA_ENTREGA_SEGUNDOS = 28;
    let tSegundosCompra = Math.floor(timestamp.getTime() / 1000);
    let tSegundosActual = Math.floor(Date.now() / 1000)
    let tSegundosDesdeCompra = tSegundosActual - tSegundosCompra;
    let tSegudosParaEntrega = DEMORA_ENTREGA_SEGUNDOS - tSegundosDesdeCompra;
    return (tSegudosParaEntrega >= 0) ? tSegudosParaEntrega : 0;
  }

  leyenda(timestamp) {
    let segundos = this.segundosParaEntrega(timestamp);
    if (segundos > 7)
      return segundos - 7 + " minutos para entrega";
    return 'Producto entregado!'
  }

  estadoActivo(timestamp) {
    let segundos = this.segundosParaEntrega(timestamp);
    
    if (0 <= segundos && segundos <= 7)
      return 3;
    else if (7 < segundos && segundos <= 14)
      return 2;
    else if (14 < segundos && segundos <= 21)
      return 1;  
    if (21 < segundos)
      return 0;
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className= "Producto">
              {/* <img src={this.state.compra.plato.img} width='100%'/> */}
              
              <h3>Estado del envío</h3>
                
                <HorizontalNonLinearAlternativeLabelStepper activeStep = {this.estadoActivo(this.state.compra.timestampCompra)}/>
                <p><i>{this.leyenda(this.state.compra.timestampCompra)}</i></p>

                <Card className={classes.card}>
                  <CardContent>
                    <div className='info'>
                      <h2> {this.state.compra.plato.title} </h2>
                      <div className='descripcion-producto'>
                        {this.state.compra.plato.descripcion}
                      </div>
                      <br />
                      <StarRatings
                        starDimension='30px'
                        rating={this.state.compra.plato.estrellas}
                        starRatedColor="#FFAB00"
                        
                        numberOfStars={5}
                        name='rating'/>
                    </div>

                    <p>Cantidad: {this.state.compra.cantidad}</p>
                    <p>Fecha de compra: {this.formatearFecha(this.state.compra.timestampCompra)} </p>
                  </CardContent>
                </Card>
                <br />
                
                  <h3> Ingredientes </h3>
                  <div className='ingredientes'>
                      <Typography variant="subheading" align="left">
                        {this.state.ingredientes.map(item =>
                            <ul> <li>{item} </li></ul>
                        )}
                      </Typography>
                  </div>

                  <br/>
                  <img src={this.state.compra.plato.video} width='100%'/>

                  <h3> Receta </h3>
                  <div className='receta'>
                    {this.state.compra.plato.receta}
                  </div>
        </div>

    );
  }
}

export default withStyles(styles)(withRouter(ProductoComprado));
