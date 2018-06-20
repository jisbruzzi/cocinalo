import appdata from './appData.js';

class Proxy {
    constructor() {
      this._type = 'Proxy';
      this.data = appdata;
      this.notifCarrito=()=>{};
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

    getUsuario() {
      return new Promise((resolve, reject) => {
        resolve(this.data.usuario);
      });
    }

    getPlatos() {
        return new Promise((resolve, reject) => {
              resolve(this.data.platos);
        });
    }

    getPlatoById(id) {
      return new Promise((resolve, reject) => { 
        let elem = this.data.platos.find(e => e.id == id);
        resolve(elem);
      });
    }

    getFavoritos() {
      return new Promise(function(resolve, reject){
        resolve(appdata.favoritos);
      });
    }

    generarSiguienteIdEnCompras() {
      let maxId = this.data.comprados.reduce(
                (max, compra) => Math.max(max, compra.idCompra), 0);
      return maxId + 1;
    }
  
    // TODO: Agregar tratamiento de CANTIDAD
    agregarProductoAComprados(idPlato2, cantidad2) {
      let resultado = this.data.comprados.find(c => c == idPlato2);
      if(!resultado){
        this.data.comprados.push({
                idCompra: this.generarSiguienteIdEnCompras(),
                idPlato: idPlato2,
                cantidad: cantidad2
        });
      } else {
        //resultado.cantidad += parseInt(cantidadPedida);
      }
    }

    comprarCarrito(listaItemsCarrito) {
      listaItemsCarrito.forEach( p =>
        this.agregarProductoAComprados(p.idPlato, p.cantidad)
      );
      this.data.carrito = [];
    }

    getCarrito(){
        return new Promise((resolve, reject) => {
          function getPlatoById(listadoPlatos, id) {
            return listadoPlatos.find(e => e.id == id);
          }

          let resultado = this.data.carrito.map((p)=>{return {
                                                    idPlato: p.idPlato,
                                                    cantidad: p.cantidad,
                                                    datosPlato: getPlatoById(this.data.platos, p.idPlato)
                                                  }});
          resolve(resultado);
        });
    }
    notificarCambioCarrito(evento){
      this.notifCarrito=evento;
    }

    getPlatosConsulta(consulta){
      function shuffleArray(arr){
        return arr
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
      }

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
        let ret=[].concat(matchEntera).concat(matchPalabra).concat(shuffleArray(appdata.platos))
        
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

    agregarPlatoAFavoritos(idProducto) {
      this.data.favoritos.push(idProducto);
    }

    quitarPlatoDeFavoritos(idProducto) {
      let index = this.data.favoritos.indexOf(idProducto);
      this.data.favoritos.splice(index, 1);
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

    getCompras() {
      return new Promise((resolve, reject) => {
        function getPlatoByIdSincronico(platos, id) {
          return platos.find(e => e.id == id);
        }

        let comprados = this.data.comprados.map((c) =>
                             { return {
                                  idCompra: c.idCompra,
                                  plato: getPlatoByIdSincronico(this.data.platos,c.idPlato),
                                  cantidad: c.cantidad
                              }});

        resolve(comprados);
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
        this.notifCarrito(this.data.carrito)
    }

    quitarPlatoDeCarrito(id){
      let resultado = this.data.carrito.find(e => e.idPlato == id);
      var index = this.data.carrito.indexOf(resultado);
      if (index >= -1) {
        this.data.carrito.splice(index, 1);
      }
      this.notifCarrito(this.data.carrito)
    }

      getPlatoById(id) {
        return new Promise((resolve, reject) => { 
          let elem = appdata.platos.find(e => e.id == id);
          console.log("PROXY-ELEM:", elem)
          resolve(elem);
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
            resolve(resultado);
          });
      }

  }
  
export default new Proxy();
