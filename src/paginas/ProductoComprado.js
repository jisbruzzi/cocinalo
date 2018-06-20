import React, { Component } from 'react';
import 'typeface-roboto';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import proxy from '../Proxy';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

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
  
  render() {
    const { classes } = this.props;
    return (
      <div className= "Producto">
              {/* <img src={this.state.compra.plato.img} width='100%'/> */}
              
              
                <div className='info'>
          
                  <h2> {this.state.compra.plato.title} </h2>
                  <div className='descripcion-producto'>
                    {this.state.compra.plato.descripcion}
                  </div>
                  <br />
                  <StarRatings
                    starDimension='30px'
                    rating={this.state.compra.plato.estrellas}
                    starRatedColor="blue"
                    
                    numberOfStars={5}
                    name='rating'/>

                </div>
                <br />
                <Divider />
                <p>Cantidad: {this.state.compra.cantidad}</p>
                <Divider />

                <h3>Estado actual</h3>
                <p>En un rato pongo la barrita de progreso</p>
                
                <Divider />

                  <h3> Ingredientes </h3>
                  <div className='ingredientes'>
                        {this.state.ingredientes.map(item =>
                            <p> {item} </p>
                       )}
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
