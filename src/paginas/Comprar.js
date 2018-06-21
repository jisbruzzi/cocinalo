import React, { Component } from 'react';
import 'typeface-roboto'
import { Button } from '@material-ui/core';
import proxy from '../Proxy';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CompradosCard from './CompradosCard'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: 0,
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
  contenedor: {
    padding: '1em',
    'text-align': 'left'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  cellCenter: {
    'text-align': 'center'
  }
});


class Comprar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCarrito: this.props.location.state.itemsCarrito,
      esCarrito: this.props.location.state.esCarrito,
      usuario: {}
    }
  }

  componentDidMount() {
    proxy.getUsuario().then(u => {this.setState({usuario: u})});
    //proxy.getPlatoById(this.props.match.params.id).then((p)=>{this.setState({plato: p});});
  }

  borrarCarritoDeVista() {
    this.setState({itemsCarrito: []});
  }

  comprarCarrito(itemsCarrito) {
    proxy.comprarCarrito(itemsCarrito, this.state.esCarrito);
    this.borrarCarritoDeVista();
    this.props.history.push('/home');
  }

  costoComprados() {
    return this.props.location.state.itemsCarrito.reduce(
      (total, elem) => total + elem.cantidad * elem.datosPlato.precio, 0)
  }

  handleChangeDireccion = () => event => {
    let nuevoUsuario = this.state.usuario;
    nuevoUsuario.direccion = event.target.value;
    this.setState({
      usuario: nuevoUsuario
    });
  }

  handleChangeTarjetaNumero = () => event => {
    let nuevoUsuario = this.state.usuario;
    nuevoUsuario.tarjetaNumero = event.target.value;
    this.setState({
      usuario: nuevoUsuario
  });
  }
    
  render() {
    return (
        <div className = {this.props.classes.contenedor}>

            <div style={{'margin-top': '10px', 'margin-bottom': '26px'}} > <b>Nombre</b>: { this.state.usuario.nombre + ' ' + this.state.usuario.apellido } </div>
            <p> <b>Direccion</b>:
              <TextField
              id="direccion"
              value={this.state.usuario.direccion}
              className={this.props.classes.textField}
              onChange={this.handleChangeDireccion()}
              margin="normal"/>
            </p>
            <p> <b>Nº tarjeta</b>: <TextField
              id="tarjetaNumero"
              value={this.state.usuario.tarjetaNumero}
              className={this.props.classes.textField}
              onChange={this.handleChangeTarjetaNumero()}
              margin="normal"/>
            </p>

            <Divider />

            <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='none' >Cantidad</TableCell>
                <TableCell padding='none' numeric className={this.props.classes.cellCenter}>Nombre</TableCell>
                <TableCell padding='none' numeric>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.itemsCarrito.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell padding='none' numeric>{item.cantidad}</TableCell>
                    <TableCell component="th" scope="row">
                      {item.datosPlato.title}
                    </TableCell>
                    <TableCell padding='none' numeric>{item.datosPlato.precio * item.cantidad}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

            <br />
            <h4> Total: AR$ {this.costoComprados()} </h4>

            <br />
            <Button
              fullWidth variant="contained"
              variant="contained"
              color="primary"
              onClick={()=>{this.comprarCarrito(this.props.location.state.itemsCarrito)}}>
              
              Confirmar compra
            </Button>
        </div>
    );
  }
}

export default withStyles(styles)(Comprar);
