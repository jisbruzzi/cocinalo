import image from './img/papas.jpg';
import image2 from './img/quinoa.jpg';
import image3 from './img/hamburguesa.jpg';
import image4 from './img/sushi.jpg';

  const appData = {
    // Por ahora hay un solo usuario super hardcodeado
    // con sus datos, favoritos, platos comprados y packs comprados.
    usuario: {
              username: 'Pepenacho',
              nombre: 'José',
              apellido: 'Sbruzzi',
              direccion: 'Paseo Colón 850',
              tarjetaNumero: '1249-9203-3021-8745',
    },
    favoritos: [5,1,3,2],
    comprados: [4,6],
    packsComprados: [2],

    packs: [
            {
              id: 1,
              platos: [2,3],
            },
            {
              id: 2,
              platos: [1,4],
            },
            {
              id: 3,
              platos: [5,6,3],
            }
           ],
    platos: [
              {
                id: 1,
                img: image,
                title: 'Papas fritas',
                author: 'Carlos Alberto “El Gato” Dumas',
                descripcion: 'Las papas fritas o patatas fritas, también conocidas como papas a la francesa o patatas a la francesa, son las papas que se preparan cortándose en rodajas o en forma de bastones y friéndolas en aceite caliente hasta que queden doradas, retirándolas del aceite y luego sazonándolas con sal.',
                tiempo: 30,
                precio: 100,
                estrellas: 5,
              },
              {
                id: 2,
                img: image2,
                title: 'Image2',
                author: 'author',
                descripcion: 'plato feo',
                tiempo: 60,
                precio: 150,
                estrellas: 4,
              },
              {
                id: 3,
                img: image3,
                title: 'Image3',
                author: 'author',
                descripcion: 'plato sano',
                tiempo: 40,
                precio: 120,
                estrellas: 3,
              },
              {
                id: 4,
                img: image4,
                title: 'Image4',
                author: 'author',
                descripcion: 'plato gourmet',
                tiempo: 120,
                precio: 200,
                estrellas: 2,
              }
            ],
  };

export default appData;