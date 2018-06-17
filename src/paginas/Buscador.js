import React from 'react';
import { withStyles } from '@material-ui/core/styles';




let styles={}
styles.fondo={
    zIndex:100,
    backgroundColor:"rgba(0,0,0,0.6)",
    position:"fixed",
    padding:0,
    margin:0,
    left:0,
    top:0,
    width:"100vw",
    height:"100vh",
}

function buscador(props){
    console.log("Renderizan el buscador :)")
    return <div style={styles.fondo} onClick={props.history.goBack}>
        
    </div>
}
export default (buscador)