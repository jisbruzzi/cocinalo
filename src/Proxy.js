import appdata from './appData.js';

class Proxy {
    constructor() {
      this._type = 'Proxy';
      this.data = appdata;
    }
  
    singletonMethod() {
      return 'singletonMethod';
    }
  
    static staticMethod() {
      return 'staticMethod';
    }
  
    get type() {
      return this._type;
    }
  
    set type(value) {
      this._type = value;
    }

    getPlatos() {
        return new Promise(function(resolve, reject){
              resolve(appdata.platos);
        });
    }
    getSugerenciasCon(busqueda){
      return new Promise(function(resolve,reject){
        function arreglar(str){
          return str.toLocaleLowerCase().replace(".","").replace(",","").replace(";","")
        }

        busqueda=arreglar(busqueda)
        let palabra=""
        let ret=[]
        let platos=appdata.platos
        
        let titulosMatch=platos
          .map((p)=>arreglar(p.title))
          .filter((titulo)=>titulo.includes(busqueda))
        let autoresMatch=platos
          .map((p)=>arreglar(p.author))
          .filter((author)=>author.includes(busqueda))
        let descripcionesMatch=platos
          .map((p)=>arreglar(p.descripcion))
          .filter((descripcion)=>descripcion.includes(busqueda))

        let palabras=busqueda.split(" ")
        let restoPalabras=palabras.slice(0,palabras.length-1)
        let ultimaPalabra=palabras[palabras.length-1]
        
        if(busqueda.includes(" ")){//búsqueda para más de una palabra, esto va arriba de todo
          ret=ret.concat(titulosMatch).concat(autoresMatch)
        }
        let frases=[].concat(titulosMatch).concat(autoresMatch).concat(descripcionesMatch)
        let palabrasMatchean=frases
          .map((f)=>f.split(" "))
          .reduce((a,b)=>a.concat(b),[])
          .filter((p)=>p.includes(ultimaPalabra))
        let fraseAnterior=restoPalabras.join(" ")+" "
        let matchesEnteros=palabrasMatchean.map((p)=>fraseAnterior+p)
        ret=ret.concat(matchesEnteros)

        ret=ret.filter((item,pos,self)=>{
          return self.indexOf(item)==pos
        })

        resolve(ret.map((s)=>arreglar(s)))
      })
    }
  }
  
export default new Proxy();
