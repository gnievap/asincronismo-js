const fetchData = require('../utils/fetchData');
const API = 'https://rickandmortyapi.com/api/character/';

// Se hace el primer llamado a fetchData
fetchData(API)
    .then( data => {
        // Se imprime el total de personajes
        console.log(data.info.count);
        // Una nueva petición a fetchData, enviando el id de la posición 0 de data (personaje1)
        return fetchData(`${API}${data.results[0].id}`)
    })
    .then( data => {
        // esperamos la info de la promesa anterior e imprimimos el nombre obtenido (Rick)
        console.log(data.name)
        // Se realiza otra petición para obtener la dimensión de Rick
        return fetchData(data.origin.url)
    })
    .then( data => {
        // Si se obtienen los datos de la promesa, se imprime la dimensión
        console.log(data.dimension)
    })
    // Se programa el catch por si existe un error 
    .catch( err => console.error(err));
