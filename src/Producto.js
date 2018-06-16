import React, { Component } from 'react';
import logo from './logo.svg';
import 'typeface-roboto';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import proxy from './Proxy';
import './Producto.css';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
});

const cantidades = [
  {
    value: '1',
    label: '1 UNIDAD',
  },
  {
    value: '2',
    label: '2 UNIDADES',
  },
  {
    value: '3',
    label: '3 UNIDADES',
  },
  {
    value: '4',
    label: '4 UNIDADES',
  },
  {
    value: '5',
    label: '5 UNIDADES',
  }
];

class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: [],
      producto: {}
    }
  }
  componentDidMount() {
      proxy.getPlatos().then((value)=>{this.setState({platos: value}); 
      var producto2 = this.state.platos.find((e)=>{return e.id==this.props.match.params.id});
      this.setState({producto: producto2});
    });
  }

  comprarProducto (idProducto){
        this.props.history.push('/comprar/'+idProducto);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className= "Producto">
              <img src={this.state.producto.img} width='100%'/>
               <div className='info'>
           

                  <h2> {this.state.producto.title} </h2>
                  <div className='descripcion-producto'> {this.state.producto.descripcion}</div>

                  <p> <b>Autor</b>: {this.state.producto.author}</p>
                  <p> Cantidad de estrellas: {this.state.producto.estrellas}</p>
                  <StarRatings
                    starDimension='30px'
                    rating={3.7}
                    starRatedColor="blue"
                    
                    numberOfStars={5}
                    name='rating'/>
                </div>

                <div className="boton">
                <TextField
                    id="select-currency-native"
                    select
                    label="Cantidad"
                    className={classes.textField}
                    value={this.state.currency}
                    margin="normal"

                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}>

                    {cantidades.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>


                </div>

            <div className="boton">
              <Button fullWidth variant="contained" onClick={()=>{this.comprarProducto(this.state.producto.id)}}>
              Comprar
              </Button>
            </div>
            <Button fullWidth variant="contained">
            Añadir al carrito
            </Button>
        </div>

    );
  }
}

export default withStyles(styles)(withRouter(Producto));
