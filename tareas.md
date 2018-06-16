# Documentación: (12hs)
 - Hacer el backlog más detallado, con las cosas más nuevas y con las versiones anteriores de los documentos. [4 horas]
 - Armar *todos* los prototipos[8 horas]
 
# Presentación (infinitas hs)
 - Armar y ensayar la presentación [infitas horas]

# Desarrollo (44hs)

- Database: Una clase que haría de proxy con el server, cosa de que el día de mañana se lo pueda agregar. **Tiene que devolver siempre promesas para que el día demañana se pueda poner un json-server o algo similar**. Debería tener una parte que sea un json facil de leer cosa de que podamos alterar la base de datos en un solo lugar, sin tener que buscar los datos por toda la aplicación. **Manejar estado global en react es muy engorroso.**
[tiempo estimado: ?]

- Cocinalo: **TERMINADO**
    Tiene un BottomNaviation y un AppBar, maneja si se muestra <Inicio/> <Favoritos/> <Packs/> <Comprados/> <Perfil/> <Carrito/>,  <Busqueda/>, <Resultados/> o algún <Producto/> (estos datos vienen por callback) (implementar un router?)
    No te permite ir a Perfil ni a Packs.
    Estado: Cuál muestra
    [4 horas]

- Inicio: Muestra categorias estáticas. Estado: ninguno [2 horas]
- Categoria: Carga cuáles son los productos de cierta categoría de la db y muestra los ThumbnailProducto como slider horizontal. Estado: listado de productos de esta categoria.
[4 horas]

- Favoritos, Comprados y Resultados: son listas de productos, casi lo mismo. Hacen un cierto "request" a la db y muestran una cuadricula de ThumbnailProducto. Estado: lo que viene de db.[8 horas]

- ThumbnailProducto: Muestra el producto. Expone un callback para mostrar este Producto al hacer click. Recibe un identificador de producto en sus props y con eso hace la consulta a db. Carga de db si está favoriteado o no. Estado: favoriteado o no [4 horas]

- Carrito: Carga los productos en el carrito, y cuántos hay, y muestra los ItemCarrito. Muestra el total y un botón de comprar. Estado: lo cargado de db [4 horas]
- ItemCarrito: Muestra un ThumbnailProducto y la cantidad que hay. Permite agregar/sacar/etc. Estado: nada.[4 horas]



- Busqueda: Pantalla de búsqueda, probablemente flotante, aparece al tocar la lupa. Muestra recomendaciones. Expone un callback al definirse qué palabra buscar. Estado: Autocompletar traído de db. [ 8 horas ]

- Producto: Muestra imagen, cantidad de estrellas, descripción, breve receta (completa si fue comprado), comprar/agregar al carrito (si no está en el carrito) contador y un + y - (si está en el carrito), Comentarios. Muestra una barrita de progreso si el producto está en camino. [16 horas]