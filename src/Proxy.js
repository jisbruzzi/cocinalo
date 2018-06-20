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
    getPlatosConsulta(consulta){
      function parecidas(a,b){
        return(a.toUpperCase().includes(b.toUpperCase()))
      }

      function getPlatosConsultaRealmente(consulta){
        let matchTitulo=appdata.platos.filter((plato)=>parecidas(plato.title,consulta))
        let matchAutor=appdata.platos.filter((plato)=>parecidas(plato.author,consulta))
        let matchDescripcion=appdata.platos.filter((plato)=>parecidas(plato.descripcion,consulta))
        let matchCategoria=appdata.platos.filter((plato)=>parecidas(plato.categoria,consulta))
        let ret=[].concat(matchTitulo,matchAutor,matchDescripcion,matchCategoria)
        return ret
      }

      return new Promise(function(resolve,reject){
        let matchEntera=getPlatosConsultaRealmente(consulta)//frase entera
        let matchPalabra=consulta.split(" ").map(getPlatosConsultaRealmente).reduce((a,b)=>a.concat(b),[])//cada palabra
        let ret=[].concat(matchEntera).concat(matchPalabra).concat(appdata.platos)
        
        ret=ret.filter((item,pos,self)=>{
          return self.indexOf(item)==pos
        })
        resolve(ret)
      })
    }
    getSugerenciasCon(busqueda){
      return new Promise(function(resolve,reject){
        function arreglar(str){
          return str.toLocaleLowerCase().replace(".","").replace(",","").replace(";","")
        }

        function atributoArreglado(atributo){
          return appdata.platos
            .map((p)=>arreglar(p[atributo]))
        }

        busqueda=arreglar(busqueda)
        let palabra=""
        let platos=appdata.platos

        
        let palabras=busqueda.split(" ")
        let restoPalabras=palabras.slice(0,palabras.length-1)
        let ultimaPalabra=palabras[palabras.length-1]
        let rePalabraTerminada=new RegExp("("+busqueda+" [^ ]+)")
        let rePalabraNoTerminada=new RegExp("("+busqueda+"[^ ]+)")

        let restoFrase=restoPalabras.join(" ")

        function sugeridorPalabraTerminada(texto){
          let resultado=rePalabraTerminada.exec(texto)
          if(resultado==null){
            return null
          }else{
            return resultado[1]
          }
        }

        function sugeridorPalabraNoTerminada(texto){
          let resultado=rePalabraNoTerminada.exec(texto)
          if(resultado==null){
            return null
          }else{
            return resultado[1]
          }
        }

        function sugerenciasAtributo(atributo,sugeridor){
          return atributoArreglado(atributo).map(sugeridor).filter((s)=>s!=null)
        }

        function sugerenciasAtributoMultiples(atributo){
          let sugTerminada=sugerenciasAtributo(atributo,sugeridorPalabraTerminada)
          let sugNoTerminada=sugerenciasAtributo(atributo,sugeridorPalabraNoTerminada)
          let sug=[].concat(sugTerminada,sugNoTerminada)
          return sug
        }

        let sugTitulo=sugerenciasAtributoMultiples("title")
        let sugAutor=sugerenciasAtributoMultiples("author")
        let sugDescripcion=sugerenciasAtributoMultiples("descripcion")
        let sugCategoria=sugerenciasAtributoMultiples("categoria")

        let ret= [].concat(sugTitulo,sugAutor,sugDescripcion,sugCategoria)

        ret=ret.filter((item,pos,self)=>{
          return self.indexOf(item)==pos
        })
        resolve(ret.map(arreglar))

        /*
        
        let titulosMatch=atributoIncluye("title",busqueda)
        let autoresMatch=atributoIncluye("author",busqueda)
        let descripcionesMatch=atributoIncluye("descripcion",busqueda)

        
        
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
        */
      })
    }
  }
  
export default new Proxy();
