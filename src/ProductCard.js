import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import proxy from './Proxy';
import { withRouter } from 'react-router-dom';


var styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    width: '70%',
    textAlign: 'left'
  },
  cover: {
    width: '210px',
    height: '210px',
  },
  playIcon: {
    height: 100,
    width: 100,
  }
});
class ProductCard extends Component {
  delete(id){
    this.props.delete(id);
  }
  render(){
        return (
            <div>
            <Card className={this.props.classes.card}>
                <CardContent className={this.props.classes.content}>
                    <Typography style={{'margin-bottom': '5px' }} variant="subheading" align="left">
                      <b>{this.props.itemCarrito.datosPlato.title}</b>
                    </Typography>
                    <Typography variant="subheading" align="left" color="textSecondary">
                      <i>Precio unitario: AR$ {this.props.itemCarrito.datosPlato.precio}</i>
                    </Typography>
                    <Typography variant="subheading" align="left" color="textSecondary">
                      <i>Cantidad: {this.props.itemCarrito.cantidad}</i>
                    </Typography>
                    <IconButton style={{'width': '15px' }} aria-label="delete" onClick={this.delete.bind(this,this.props.itemCarrito.idPlato)}>
                        <DeleteIcon/>
                    </IconButton>
                </CardContent>
                <CardMedia
                className={this.props.classes.cover}
                image={this.props.itemCarrito.datosPlato.img}
                />
            </Card>
            </div>
        );
    }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(ProductCard));