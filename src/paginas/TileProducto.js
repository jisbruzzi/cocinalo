import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import proxy from "../Proxy"
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
/**
 * Props obligatorias:
 * tile 
 * onClick
 */

class TileProducto extends React.Component{
    constructor(props){
        super(props)
        this.state={
            enFavoritos:false
        }
        this.actualizarEstadoFavoriteo()
        
    }
    actualizarEstadoFavoriteo(){
        proxy.getFavoritos().then((favoritos)=>{
            this.setState({
                enFavoritos:favoritos.filter((fav)=>fav==this.props.tile.id).length>0
            })
        })
    }
    render(){
        let tile=this.props.tile

        const {classes}=this.props
        let enFavoritos=<FavoriteIcon  style={{color: '#B71C1C', 
            backgroundColor: 'rgba(255,255,255,0.8)',
            border: 'solid rgba(255,255,255,0.2) 5px', 
            borderRadius: '50px'}}
            onClick={() => {
                proxy.quitarPlatoDeFavoritos(tile.id).then(()=>
                    this.actualizarEstadoFavoriteo()
                )
            }}/>
        let noEnFavoritos=<FavoriteBorderIcon style={{color: '#B71C1C', 
            backgroundColor: 'rgba(255,255,255,0.8)',
            border: 'solid rgba(255,255,255,0.2) 5px', 
            borderRadius: '50px'}} 
            onClick={() => {
                proxy.agregarPlatoAFavoritos(tile.id).then(()=>
                    this.actualizarEstadoFavoriteo()
                )
            }}/>

        
        return <GridListTile key={tile.key} {...this.props}>
            <img src={tile.img} alt={tile.title} onClick={()=>{this.props.onClickData(tile)}}/>
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              style={{backgroundColor: 'rgba(0,0,0,0.6)'}}
              actionIcon={
                <IconButton>
                  {this.state.enFavoritos? enFavoritos : noEnFavoritos}
                </IconButton>
              }
            />
        </GridListTile>
    }
}

export default TileProducto