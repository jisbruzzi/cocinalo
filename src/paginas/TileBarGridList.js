import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
//import tileData from './tileData';
import { withRouter } from 'react-router-dom';

import TileProducto from "./TileProducto"


import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


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

/*
data es un array de objetos con:
key: lo que disntingue este tile de los demás
img:la imagen del tile
title: el título del tile
author:el subtítulo del tile

las props obligatorias son:
onClick(recibe el objeto que se armó)
data
subheader(opcional)

*/
function TitlebarGridList(props) {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!! LOS PROPS !!!!!!!!!!!!!!!!")
  console.log(props)
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} cols={2} className={classes.gridList}>
        {props.subheader && <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div" disableSticky={true}>{props.subheader}</ListSubheader>
        </GridListTile>}
        {props.data.map(tile => 
          
          <TileProducto key={tile.key} tile={tile} onClickData={props.onClickData}/>
        )}
      </GridList>
    </div>
  );
}
/*
<GridListTile key={tile.key} >
            <img src={tile.img} alt={tile.title} onClick={()=>{this.props.onClick(tile)}}/>
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              style={{backgroundColor: 'rgba(0,0,0,0.6)'}}
            />
          </GridListTile>
          */
//<TileProducto tile={tile} onClick={props.onClick}/>
TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(TitlebarGridList));