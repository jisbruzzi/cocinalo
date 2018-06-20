import React, { Component } from 'react';
import 'typeface-roboto';
import { withRouter } from 'react-router-dom';
import proxy from '../Proxy';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
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
});

class ProductoComprado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platos: [],
      producto: {},
    }
  }

  componentDidMount() {
      proxy.getPlatos().then((value)=>{this.setState({platos: value}); 
      var producto2 = this.state.platos.find((e)=>{return e.id==this.props.match.params.id});
      this.setState({producto: producto2});
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className= "ProductoComprado">
              <img src={this.state.producto.img} width='100%'/>
              
              
                <div className='info'>
          
                  <h2> {this.state.producto.title} </h2>
                  <div className='descripcion-producto'>
                    {this.state.producto.descripcion}
                  </div>

                  <p> Cantidad de estrellas: </p>
                  <StarRatings
                    starDimension='30px'
                    rating={this.state.producto.estrellas}
                    starRatedColor="blue"
                    
                    numberOfStars={5}
                    name='rating'/>

                  <h3> Ingredientes </h3>
                  <div className='descripcion-producto'>
                    {this.state.producto.ingredientes}
                  </div>

                  <br/>
                  <img src={this.state.producto.video} width='100%'/>

                  <h3> Receta </h3>
                  <div className='descripcion-producto'>
                    {this.state.producto.receta}
                  </div>
                </div>
        </div>

    );
  }
}

export default withStyles(styles)(withRouter(ProductoComprado));
