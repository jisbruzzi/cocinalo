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
                title: 'Torta de verdura',
                author: 'Enrique Gonzales',
                descripcion: 'La torta de verdura es una plato Vegetariano que se prepara con huevo, papa, y un preparado de verdura de alta calidad, luego se da una cocción de 15 minutos y se puede comer.',
                tiempo: 60,
                precio: 150,
                estrellas: 4,
              },
              {
                id: 3,
                img: image3,
                title: 'Hamburguesa de ternera',
                author: 'Utilísima',
                descripcion: 'La clásica hamburguesa de ternera, fácil y rápida de hacer. Incluye cebolla caramelizada, panceta, y el mejor queso especial seleccionado por Utilísima.',
                tiempo: 40,
                precio: 120,
                estrellas: 3,
              },
              {
                id: 4,
                img: image4,
                title: 'Sushi',
                author: 'El dragón - Gourmet',
                descripcion: 'Ingredientes preparados para que puedas cocinar sushi.',
                tiempo: 120,
                precio: 200,
                estrellas: 2,
              }
            ],
  };

export default appData;