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
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});
class ProductCard extends Component {
  delete(id){
    this.props.delete(id);
  }
  render(){
        return (
            <div>
            <Card className={this.props.classes.card}>
                <div className={this.props.classes.details}>
                <CardContent className={this.props.classes.content}>
                    <Typography variant="subheading" align="left">{this.props.itemCarrito.datosPlato.title}</Typography>
                    <Typography variant="subheading" align="left" color="textSecondary">
                    Cantidad: {this.props.itemCarrito.cantidad}
                    </Typography>
                    <IconButton aria-label="delete" onClick={this.delete.bind(this,this.props.itemCarrito.idPlato)}>
                                <DeleteIcon/>
                    </IconButton>
                </CardContent>
                </div>
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