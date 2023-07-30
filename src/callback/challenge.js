// Instanciar XMLHttpRequest, objeto de JS para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// URL de la API
let API = 'https://rickandmortyapi.com/api/character/';

// Función fetchData que recibe la URL de la API a la que vamos a llamar, y un callback
function fetchData(url_api, callback){

    // Instanciando xhttp del objeto XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    // Abrir una conexión con GET, pasándole la URL de la API y true para activar el asincronismo
    xhttp.open('GET', url_api, true);

    /* Validar que se esté ejecutando el llamado
       Después se valida el estado que se está recibiendo, el estado de la conexión,
       y si todo va bien, se ejecuta el callback
    */
    xhttp.onreadystatechange = function(event){
        // Propiedad readyState: regresa el estado en el que un cliente XMLHttpRequest está.
        // Se compara con el código 4 para saber si la operación está completa
        if ( xhttp.readyState === 4 ) {
            /* Propiedad status: regresa un valor numérico que represnta el estado HTTP
               de la respuesta de XMLHttpRequest.
               El status 200 indica que se tiene una respuesta exitosa.
               Por cierto, antes que de la petición se complete, status vale 0,
               aunque algunos browsers también regresan 0 en caso de error. 
            */
            if ( xhttp.status === 200 ) {
                callback(null, JSON.parse(xhttp.responseText));
            }
            // En caso contrario, se envía un error al callback
            else {
                const error = new Error('Error ' + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

// Función para recuperar los datos de la API 
// La primera llamada es para recuperar la lista de personajes
fetchData( API, function (error1, data1) {
    // Si existe un error con la petición, se retorna un error y se termina el proceso.
    if ( error1 ) return console.error(error1);
    /*  data1 contiene la lista de todos los personajes, 
        por eso volvemos a hacer la petición a la API, pero con la dirección de la API 
        más el id de la lista en la posición 0 que representa el primer personaje,
        para así obtener su nombre.
    */
    fetchData( API + data1.results[0].id, function( error2, data2 ){
        if ( error2 ) return console.error( error2 );
        /*
            Ahora data2 contiene la información del primer personaje, por lo que se le vuelve 
            a enviar en la petición  para obtener la dimensión en data3
        */
        fetchData( data2.origin.url, function( error3, data3 ){
            if ( error3 ) return console.error( error3 );
            // Se imprime la cuenta total de los elementos que data1 contiene
            console.log( data1.info.count );
            // data2 contiene la información del primer personaje, se imprime su nombre accediendo al campo name
            console.log( data2.name );
            // data3 contiene la información del origen del primer personaje, se imprime la dimensión accediendo al campo dimension
            console.log( data3.dimension );
        })
    })
}) 