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

  agregarProductoAComprados(idProducto, cantidad) {
    proxy.agregarProductoAComprados(idProducto, cantidad);
    this.props.history.push('/home');
  }

  render() {
    return (
        <div>
            <br/>
            <br/>
            <h3> USUARIO</h3>
            <p> Nombre: { this.state.usuario.nombre } </p>
            <p> Apelido: { this.state.usuario.apellido } </p>
            <p> Direccion: { this.state.usuario.direccion } </p>
            <p> Numero de tarjeta: { this.state.usuario.tarjetaNumero } </p>

            <Divider />
            <h3> PRODUCTOS </h3>
            <p> Nombre: {this.state.plato.title} </p>
            <p> Cantidad: {this.props.location.state.cantidadPedida}</p>
            <br/>

            <Divider />
            <h3> TOTAL </h3>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{this.agregarProductoAComprados(this.state.plato.id, this.props.location.state.cantidadPedida)}}>
              
              Confirmar compra
            </Button>
        </div>
    );
  }
}

export default withStyles(styles)(Comprar);
