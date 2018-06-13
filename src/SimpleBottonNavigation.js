import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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

        <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction value="/favoritos" label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction value="/perfil" label="Nearby" icon={<LocationOnIcon />} />

      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SimpleBottomNavigation));