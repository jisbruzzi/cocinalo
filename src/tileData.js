import image from './img/papas.jpg';
import image2 from './img/quinoa.jpg';
import image3 from './img/hamburguesa.jpg';
import image4 from './img/sushi.jpg';

  const tileData = [
    {
      id: 1,
      img: image,
      title: 'Image1',
      author: 'author',
      descripcion: 'plato rico',
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

];

export default tileData;