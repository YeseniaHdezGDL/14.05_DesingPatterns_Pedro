'use scrict'

/*
const modelSearch = require('../models/modelSearch');
const url = require('url');
const search = (req) => {
   var result = modelSearch();
    return (JSON.stringify(result));

};

module.exports = search;
*/
//Hasta este momento, al correr http://127.0.0.1:3000/search en navegador, arroja toda la base de datos en dataPresi.json

//Ahora, para buscar, la búsqueda se realiza en  archivo controlador, se usa función filter o un for, filter es mejor, más fácil y rápido, abajo está

/*const modelSearch = require('../models/modelSearch')
const url = require('url');

const search = (req) => {

    var basePresidentes = modelSearch();
    var palabraABuscar = "Fox";

    var result = basePresidentes.filter((consultaPresidente) => { 
        if (consultaPresidente.primerApellido === palabraABuscar) { //aquí ponemos '.primerApellido' para indicar que busque Fox en primerApellido que es como está guardado 'Fox', si ponemos 'Vicente' tendría que cambiar esta lína a .nombre, para indicar que busque Vicente en nombre del objeto y así si ponemos año etc.
            return consultaPresidente;
     }
    });
    return (JSON.stringify(result));
};

module.exports = search;*/

/*
-Esto es lo que nos pasó Pedro de ejemplo para hacer la búsqueda de arriba:
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
var term = 'limit';

const result = words.filter((word) => {
  if(word === term){
    return word;
  }
});
*/

//el resultado de correr de línea 18 a 34 en http://127.0.0.1:3000/searches es el arreglo completo de presidente Fox.

//Lo siguiente es para mandar a llamar las vistas:
/*Ejemplo para mandar resultado a la view de html
const htmlRender = (html, data) => {
    let parsedHtml = html.toString('utf8');

    for(key in data){
        let exp = "{{"+key+"}}";
        let reg = new RegExp(exp, 'g');
        parsedHtml = parsedHtml.replace(reg, data[key]);
    }

    return parsedHtml;
}; */

const modelSearch = require('../models/modelSearch');
const fileSistem = require('fs');
const path = require('path'); // línea 66, 67 y 68 se necesitan para que windows lea la ruta donde está la views
const appDir = path.dirname(require.main.filename);
var ruta = path.join('/views', 'viewsPresidentes.html');

const htmlRender = (html, data) => { //se agregó la const htmlRender, para que arroje el resultado de const search en archivo html.
    let parsedHtml = html.toString('utf8');
    for(key in data){
        let exp = "{{"+key+"}}";
        let reg = new RegExp(exp, 'g');
        parsedHtml = parsedHtml.replace(reg, data[key]);
    }
    /*return parsedHtml;*/
};

const search = (req) => {
    var basePresidentes = modelSearch();
    var palabraABuscar = "Fox";

    var result = basePresidentes.filter((consultaPresidente) => { 
        if (consultaPresidente.primerApellido === palabraABuscar) { 
            return consultaPresidente;
     }
    });
    const view = fileSistem.readFileSync(appDir + ruta).toString('utf8');
    return (view);
};

module.exports = search; //siempre al final