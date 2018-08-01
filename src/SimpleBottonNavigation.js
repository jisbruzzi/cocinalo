import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RedeemIcon from '@material-ui/icons/Redeem';
import PermIdentity from '@material-ui/icons/PermIdentity';
import { NavLink, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'


const styles = {
  root: {
    width: 500,
  },
};

class SimpleBottomNavigation extends React.Component {

  state = {
    value: "/"
  };

  handleChange = (event, value) => {
      this.setState({ value });
      this.props.history.push(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        style={{position:"fixed", bottom:"0", width:"100%"}}>

        <BottomNavigationAction style={{marginRight: '-15px'}} value="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction style={{marginRight: '-15px'}} value="/favoritos" label="Favoritos" icon={<FavoriteIcon />} />
        <BottomNavigationAction style={{marginRight: '-15px'}} value="/packs" label="Packs" icon={<RedeemIcon />} />
        <BottomNavigationAction style={{marginRight: '-15px'}} value="/comprados" label="Comprados" icon={<RestaurantIcon />} />
        <BottomNavigationAction value="/perfil" label="Perfil" icon={<AccountCircleIcon />} />
        

      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SimpleBottomNavigation));
