import React, { Component } from 'react';
import 'typeface-roboto';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import proxy from '../Proxy';
import StarRatings from 'react-star-ratings';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RedeemIcon from '@material-ui/icons/Redeem';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';

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
  iconos: {
    alignSelf: 'left',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%', 
  },
});



class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      vegetariano: false,
      celiaco: false,
    }
  }

  componentWillMount() {
      proxy.getSwitchVegetariano().then((valor)=>{
        this.setState({vegetariano: valor});
    });
      proxy.getSwitchCeliaco().then((valor)=>{
        this.setState({celiaco: valor});
    });
  }

  componentDidMount() {
      proxy.getUsuario().then((usuario)=>{
        this.setState({usuario: usuario});
    });
  }

  handleChangeVegetariano = name => event => {
  console.log("Estoy aca: "+ this.state.vegetariano);
    this.setState({ [name]: event.target.checked });
    proxy.setSwitchVegetariano(!this.state.vegetariano);
  };

  handleChangeCeliaco = name => event => {
    this.setState({ [name]: event.target.checked });
    proxy.setSwitchCeliaco(!this.state.celiaco);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className= "Producto">


              <img src={this.state.usuario.img} width='100%'/>

<Card style={{margin:"10px",padding:"0px"}}>
                <CardHeader title={<p style={{fontFamily: 'Patua One', fontSize: '20px'}}>{this.state.usuario.nombre + " " + this.state.usuario.apellido}</p>} style={{padding:"8px"}}/>
                <CardContent style={{
                  paddingLeft:0,
                  paddingRight:0,
                  paddingBottom:"16px",
                  paddingTop:"8px",
                }}>
              <div className='ingredientes' style={{'margin':'15px'}}>
                      <Typography variant="subheading" align="left" style={{fontFamily: 'Patua One','text-align':'left'}}>
                  	    {this.state.usuario.mail}
                      </Typography>
                      <br/>
                      <Typography variant="subheading" align="left" style={{fontFamily: 'Patua One','text-align':'left'}}>
                  	    {this.state.usuario.username}
                      </Typography>
                      <br/>
                      <Typography variant="subheading" align="left" style={{fontFamily: 'Patua One','text-align':'left'}}>
                  	    {this.state.usuario.direccion}
                      </Typography>
               </div>
                </CardContent>
              </Card>
  
<Card style={{margin:"10px",padding:"0px"}}>
 
                <CardContent style={{
                  paddingLeft:0,
                  paddingRight:0,
                  paddingBottom:"16px",
                  paddingTop:"16px",
                }}>
              <div className={classes.iconos}>
                      <Typography variant="subheading" align="left" style={{fontFamily: 'Patua One'}}>
                  	    Vegetariano
                        <Checkbox style={{float: "right"}}
                          checked={this.state.vegetariano}
                          onChange={this.handleChangeVegetariano('vegetariano')}
                          value="vegetariano"


                          />
                      </Typography>
                      <br/>
                      <Divider light />
                      <br/>
                      <Typography variant="subheading" align="left" style={{fontFamily: 'Patua One','text-align':'left'}}>
                  	    Celiaco
                        <Checkbox style={{float: "right"}}
                          checked={this.state.celiaco}
                          onChange={this.handleChangeCeliaco('celiaco')}
                          value="celiaco"
                          />
                      </Typography>
               </div>
                </CardContent>
              </Card>            

        </div>

    );
  }
}

export default withStyles(styles)(withRouter(Perfil));
