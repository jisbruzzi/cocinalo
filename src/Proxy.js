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

    getPlatosConsulta(consulta){
      function parecidas(a,b){
        return(a.toUpperCase().includes(b.toUpperCase()))
      }
      return new Promise((resolve,reject) => {
        let matchTitulo=this.data.platos.filter((plato)=>parecidas(plato.title,consulta))
        let matchAutor=this.data.platos.filter((plato)=>parecidas(plato.author,consulta))
        let matchDescripcion=this.data.platos.filter((plato)=>parecidas(plato.descripcion,consulta))
        let ret=[].concat(matchTitulo).concat(matchAutor).concat(matchDescripcion)
        ret=ret.filter((item,pos,self)=>{
          return self.indexOf(item)==pos
        })

        resolve(ret)
      })
    }

    getSugerenciasCon(busqueda){
      return new Promise((resolve,reject) => {
        function arreglar(str){
          return str.toLocaleLowerCase().replace(".","").replace(",","").replace(";","")
        }

        busqueda=arreglar(busqueda)
        let palabra=""
        let ret=[]
        let platos=this.data.platos
        
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
      return new Promise((resolve, reject) => {
        function idEnFavoritos(favoritos, id) {
          return favoritos.filter(e => e == id).length != 0;
        }

        let favIds = this.data.favoritos;
        let platosFavoritos = this.data.platos.filter(element => idEnFavoritos(favIds, element.id));
        resolve(platosFavoritos);
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
    }

    quitarPlatoDeCarrito(id){
      let resultado = this.data.carrito.find(e => e.idPlato == id);
      var index = this.data.carrito.indexOf(resultado);
      if (index >= -1) {
        this.data.carrito.splice(index, 1);
      }
      }
  }
  
export default new Proxy();
