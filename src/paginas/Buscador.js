import React from 'react';
import { withStyles } from '@material-ui/core/styles';

let styles={}
styles.fondo={
    zIndex:10000,
    backgroundColor:"rgba(255,255,255,0.8)",
    position:"fixed",
    padding:0,
    margin:0,
    left:0,
    top:0,
    width:"100vw",
    height:"100vh",
}

function buscador(){
    console.log("Renderizan el buscador :)")
    return <div style={styles.fondo}>
        HOLA SOY EL BUSCADOR!!! GILESSSSSSSSSS
    </div>
}

export default (buscador)