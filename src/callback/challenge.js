// Instanciar XMLHttpRequest, objeto de JS para hacer las peticiones
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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
                const error = new Error('Error' + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}
