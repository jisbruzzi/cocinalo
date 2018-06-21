import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withRouter } from 'react-router-dom';
import proxy from '../Proxy';
import TileProducto from "./TileProducto"
/*import tileData from './tileData.js';
*/
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: '#FFEB3B',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

function enFavoritos(favoritos, idProducto){
  return favoritos.filter(e => e == idProducto).length != 0;
}

class SingleLineGridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    }
  }
  componentDidMount() {
      proxy.getFavoritos().then((value)=>{this.setState({favoritos: value})});
  }
  mostrarProducto(tile){
    this.props.history.push('/producto/' + tile.id);
  }
  
  render () {
    const { classes } = this.props;
    let tiles=this.props.scrollData.map((tile)=>{
      return{
        key:tile.img,
        img:tile.img,
        title:tile.title,
        author:tile.author
      }
    })
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.2}>
          {this.props.scrollData.map(tile => 
            <TileProducto key={tile.key} tile={tile} onClickData={(p)=>this.mostrarProducto(p)}/>
          )}
        </GridList>
      </div>
    );
  }
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SingleLineGridList));