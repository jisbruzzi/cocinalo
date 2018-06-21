import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import proxy from "../Proxy"
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
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
            console.log("===============")
            console.log(classes.titleWrap)
            function simpleClamp(texto){
                let palabras=tile.title.split(" ");
                if(palabras.length>5){
                    return palabras.slice(0,5).join(" ")+" ..."
                }else{
                    return texto
                }
            }
        return <GridListTile key={tile.key} {...this.props}>
            <img src={tile.img} alt={tile.title} onClick={()=>{this.props.onClickData(tile)}}/>
            <GridListTileBar classes={{
                title:classes.title,
                titleWrap:classes.titleWrap
            }}
            titlePosition="bottom"
              title={<span style={{fontFamily: 'Patua One', fontSize: '14px'}}>{simpleClamp(tile.title)}</span>}
              subtitle={<span>by: {tile.author}</span>}
              style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.9) 100%)',
                  height:"fit-content",
                  minHeight:"40%",
                  padding:"5px"

                }}
            />
            
            <GridListTileBar
                titlePosition="top"
              style={{backgroundColor: 'rgba(0,0,0,0)'}}
              
              actionIcon={
                <IconButton>
                  {this.state.enFavoritos? enFavoritos : noEnFavoritos}
                </IconButton>
              }
            />
        </GridListTile>
    }
}


const styles={
    
    title:{
        lineClamp:2,
        wordWrap:"normal",
        textOverflow:"ellipsis",
        boxOrient:"vertical",
        overflow:"hidden",
        whiteSpace:"normal"
        //whiteSpace:"normal",
        /*
        wordWrap:"break-word",
        textOverflow:"ellipsis",
        overflow:"hidden",
        lineHeight:"1rem",
        maxHeight:"3rem"
        */
    },
    
   
    
    titleWrap:{
        height:"fit-content",
        minHeight:"40%"
    }
    /*
    title:{
        lineHeight:"40%",
        //fontSize:"40%",
        maxHeight:"100%",
        whiteSpace:"normal",
        textOverflow:"ellipsis",
        overflow:"hidden",

    }*/
}

export default withStyles(styles)(TileProducto)