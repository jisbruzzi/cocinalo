import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
//import tileData from './tileData';
import { withRouter } from 'react-router-dom';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

function mostrarProductoComprado (props, comprado){
     props.history.push({
        pathname: '/productocomprado',
        state: { compra: comprado }
      });
}

function TitlebarGridListComprados(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {props.subheader && <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{props.subheader}</ListSubheader>
        </GridListTile>}
        {props.compras.map(compra => (
          <GridListTile key={compra.idCompra}>
            <img src={compra.plato.img} alt={compra.plato.title} onClick={()=>{mostrarProductoComprado(props, compra)}}/>
            <GridListTileBar
              title={'(' + compra.cantidad + ') ' + compra.plato.title}
              subtitle={<span>by: {compra.plato.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridListComprados.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(TitlebarGridListComprados));