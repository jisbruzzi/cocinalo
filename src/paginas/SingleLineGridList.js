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
function mostrarProducto(props, idProducto){
  props.history.push('/producto/' + idProducto);
}

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
  
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {this.props.scrollData.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} onClick={()=>{mostrarProducto(this.props, tile.id)}}/>
              <GridListTileBar
                //title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                titlePosition='top'
                actionIcon={
                  <IconButton>
                    {enFavoritos(this.state.favoritos, tile.id)
                      ? <FavoriteIcon className={classes.title} style={{color: '#B71C1C', 
                                                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                                                        border: 'solid rgba(255,255,255,0.2) 5px', 
                                                                        borderRadius: '50px'}}
                                                                    onClick={() => {
                                                                      proxy.quitarPlatoDeFavoritos(tile.id);
                                                                      this.props.history.push('/home/');
                                                                      console.log("Click")
                                                                    }}/>
                      : <FavoriteBorderIcon className={classes.title} style={{color: '#B71C1C', 
                                                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                                                        border: 'solid rgba(255,255,255,0.2) 5px', 
                                                                        borderRadius: '50px'}} 
                                                                  onClick={() => {
                                                                    proxy.agregarPlatoAFavoritos(tile.id);
                                                                    this.props.history.push('/home/');
                                                                  }}/>
                    }
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SingleLineGridList));