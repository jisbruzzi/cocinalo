import React, { Component } from 'react';
import 'typeface-roboto';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import proxy from '../Proxy';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
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

class Producto extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      platos: [],
      producto: {},
      ingredientes: [],
      currency: 1
    }
  }
  componentDidMount() {
      proxy.getPlatos().then((platos)=>{
        this.setState({platos: platos}); 
        var producto = platos.find((e)=>{return e.id==this.props.match.params.id});
        this.setState({producto: producto});
        this.setState({ingredientes: producto.ingredientes.split(".")});
    });
  }

  comprarProducto(cant, idProducto){
        this.props.history.push({
          pathname: '/comprar',
          state: { 
            itemsCarrito: [{idPlato: idProducto, cantidad: cant, datosPlato: this.state.producto }],
            esCarrito: false }
        });
  }

  agregarProductoACarrito(cantidad, idProducto){
    proxy.agregarPlatoACarrito(cantidad, idProducto);
  }

  handleChange(event) {
    this.setState({currency: event.target.value});
  }

  handleSubmit(cantidad, id) {
    this.agregarProductoACarrito(cantidad, id);
    this.props.history.push('/home');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className= "Producto">
              <img src={this.state.producto.img} width='100%'/>

              <div style={{marginRight: '1.5em', marginLeft: '1.5em'}} className='info'>
        
                <h2> {this.state.producto.title} </h2>
                <div className='descripcion-producto'>
                  {this.state.producto.descripcion}
                </div>

                <p> Cantidad de estrellas: </p>
                <StarRatings
                  starDimension='30px'
                  rating={this.state.producto.estrellas}
                  starRatedColor="#FFAB00"
                  
                  numberOfStars={5}
                  name='rating'/>

              </div>
              <h3> Ingredientes </h3>
              <div className='ingredientes'>
                    <Typography variant="subheading" align="left" style={{fontFamily: 'Patua One'}}>
                      {this.state.ingredientes.map(item =>
                          <ul> <li>{item} </li></ul>
                      )}
                    </Typography>
              </div>

              <div style={{marginRight: '1.5em', marginLeft: '1.5em'}} className="boton">
                <br/>
                <Typography variant="subheading" align="left" color="textSecondary" style={{fontFamily: 'Patua One'}}>
                      Precio unitario: AR$ {this.state.producto.precio}
                </Typography>
                <TextField
                    id="select-currency-native"
                    select
                    label="Cantidad"
                    className={classes.textField}
                    value={this.state.currency}
                    margin="normal"
                    onChange={this.handleChange}

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

            
            <Button style={{'margin': '5px 0px'}} fullWidth variant="contained" color="primary" onClick={()=>{this.comprarProducto(this.state.currency, this.state.producto.id)}}>
              Comprar
            </Button>
            
            <Button fullWidth variant="contained" color="primary" onClick={()=>{this.handleSubmit(this.state.currency, this.state.producto.id)}}>
            Añadir al carrito
            </Button>

            <br />
            <br />
        </div>

    );
  }
}

export default withStyles(styles)(withRouter(Producto));
