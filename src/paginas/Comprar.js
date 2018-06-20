import React, { Component } from 'react';
import 'typeface-roboto'
import { Button } from '@material-ui/core';
import proxy from '../Proxy';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class Comprar extends Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      plato: {},
      usuario: {}
    }
  }

  componentDidMount() {
    proxy.getUsuario().then(u => {this.setState({usuario: u})});
    proxy.getPlatoById(this.props.match.params.id).then((p)=>{this.setState({plato: p}); 
    //var producto2 = this.state.platos.find((e)=>{return e.id==this.props.match.params.id});
    //this.setState({producto: producto2});
    });
  }
//         <p> Direccion: { this.state.usuario.direccion } </p>
  render() {
    return (
        <div>
            <br/>
            <br/>
            <h2> Datos del usuario</h2>
            <p> Nombre: { this.state.usuario.nombre } </p>
            <p> Apelido: { this.state.usuario.apellido } </p>
            <Divider />
            <p> Numero de tarjeta: { this.state.usuario.tarjetaNumero } </p>
            <h2> Datos del producto </h2>
            <p> Nombre: {this.state.plato.title} </p>
            <p> Cantidad: {this.props.location.state.cantidadPedida}</p>
            <br/>
            <Button variant="contained" >
              Confirmar compra
            </Button>
        </div>
    );
  }
}

export default withStyles(styles)(Comprar);
