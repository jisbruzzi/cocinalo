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

    getCarrito(){
        return new Promise(function(resolve, reject){
          function getPlatoById(listadoPlatos, id) {
            return listadoPlatos.find(e => e.id == id);
          }
          let resultado = appdata.carrito.map((p)=>{return {
                                                    idPlato: p.idPlato,
                                                    cantidad: p.cantidad,
                                                    datosPlato: getPlatoById(appdata.platos, p.idPlato)
                                                  }});
          console.log(resultado);
          resolve(resultado);
        });
    }

    getPlatosConsulta(consulta){
      function parecidas(a,b){
        return(a.toUpperCase().includes(b.toUpperCase()))
      }
      return new Promise(function(resolve,reject){
        let matchTitulo=appdata.platos.filter((plato)=>parecidas(plato.title,consulta))
        let matchAutor=appdata.platos.filter((plato)=>parecidas(plato.author,consulta))
        let matchDescripcion=appdata.platos.filter((plato)=>parecidas(plato.descripcion,consulta))
        let ret=[].concat(matchTitulo).concat(matchAutor).concat(matchDescripcion)
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

    getPlatosFavoritos() {
      return new Promise(function(resolve, reject) {
        function idEnFavoritos(favoritos, id) {
          return favoritos.filter(e => e == id).length != 0;
        }

        let favIds = appdata.favoritos;
        let platosFavoritos = appdata.platos.filter(element => idEnFavoritos(favIds, element.id));
        resolve(platosFavoritos);
      });
    }

    getPlatosComprados() {
      return new Promise(function(resolve, reject) {
        function idEnComprados(comprados, id) {
          return comprados.filter(e => e == id).length != 0;
        }

        let ids = appdata.comprados;
        let platosComprados = appdata.platos.filter(element => idEnComprados(ids, element.id));
        resolve(platosComprados);
      });
    }

    agregarPlatoACarrito(cantidadPedida, id){
        let resultado = this.data.carrito.find(e => e.idPlato == id);
        if(!resultado){
          this.data.carrito.push({
                                  idPlato: id,
                                  cantidad: cantidadPedida,
                                });
        } else {
          resultado.cantidad += parseInt(cantidadPedida);
        }
        console.log(this.data.carrito);

    }

    quitarPlatoDeCarrito(id){
      let resultado = this.data.carrito.find(e => e.idPlato == id);
      this.data.carrito.pop(id);

      console.log(this.data.carrito);

  }
  }
  
export default new Proxy();
